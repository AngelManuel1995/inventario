const express = require('express')
const Registry = require('../models/registry')
const Device = require('../models/device')
const User = require('../models/user')
const enviarCorreo = require('../mail/mailer')
const app = express()

app.get('/', (req, res) => {
    Registry.find().populate('device').populate('lender').exec().then((registries) => {
        if(registries.length === 0){
            res.status(200).json({OK:true, message:'Cero registro de prestamos'})
        }
        res.status(200).json({OK:true, registries})
    }).catch((error) => {
        res.status(400).json({OK:false, error})
    })
})

app.get('/:id', (req, res) => {
    Registry.find({device:req.params.id}).populate('device').populate('lender').exec().then((registries) => {
        if(registries.length === 0){
            return res.status(200).json({OK:false, errors:{msg:'Cero registros en la base de datos'}})
        }
        res.status(200).json({OK:true, registries})
    }).catch((error) => {
        res.status(400).json({OK:false, errors: {error}})
    })
})

app.post('/', (req, res) => {
    const { lender, startDate, endDate, receiver, deliveryObservations, _id:device, ticket } = req.body.device
    const registry = new Registry({lender, startDate, endDate, receiver, deliveryObservations, device, ticket})
    registry.save().then((registryDone) => {
        if(!registryDone){
            res.status(400).json({OK:false, message:'El registro no se pudo completar', registryDone})   
        }
        return Device.findByIdAndUpdate(registryDone.device, {$set: {state:'PRESTADO'}})
    }).then((deviceUpdatedToLent) => {
        enviarCorreo(registry, deviceUpdatedToLent).then((correoEnviado) => {
            res.status(200).json({OK:true, deviceUpdatedToLent, correoEnviado})
        }).catch((err) => {
            res.status(400).json({OK:false, err, msg:"Error al enviar correo"})
        })
    }).catch((error) => {
        res.status(400).json({OK:false, error})
    })
})

app.patch('/', (req, res) => {
    const { _id, feedbackObservations, device } = req.body.registry
    Registry.findByIdAndUpdate(_id, {$set: {feedbackObservations: feedbackObservations }}).then(((registryUpdated) => {
        if(!registryUpdated){
            res.status(400).json({OK:false, error})
        }
        return Device.findByIdAndUpdate(device, { $set: { state: 'DISPONIBLE' } })
    })).then((deviceUpdated) => {
        if(!deviceUpdated){
            res.status(400).json({OK:false, error})
        }
        res.status(200).json({OK:true, deviceUpdated})
    }).catch((error) => {
        res.status(400).json({OK:false, error})
    })
})

module.exports = app 