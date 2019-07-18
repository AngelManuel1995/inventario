const express = require('express')
const Device = require('../models/device')
const {ObjectID} = require('mongodb') 
const app = express()

app.get('/', (req, res) => {
    Device.find().then(devices => {
        res.status(200).json({OK:true, devices})
    }).catch(err => {
        res.status(400).json({OK:false, err})
    })
})

app.get('/:id', (req, res) => {
    Device.findById(req.params.id).then(device => {
        res.status(200).json({OK:true, device})
    }).catch(err => {
        res.status(400).json({OK:false, err})
    })
})

app.post('/', (req, res) => {
    let device 
    if(req.body.value.isToLend === 'true'){
        device = new Device({ ...req.body.value, state:'DISPONIBLE' })
    }else{
        device = new Device({...req.body.value, state:'NOPRESTABLE'})
    }

    device.save().then(device => {
        res.status(200).json({OK:true, device})
    }).catch(err => {
        res.status(400).json({OK:false, err})
    })
})

app.delete('/:id', (req, res) => {
    let deviceId = req.params.id

    if( !ObjectID.isValid(deviceId) ){
		return res.status(404).send() 
    }

    
    Device.findOneAndRemove({
		_id: deviceId
	}).then( (device) => {
		if(!device){
			return res.status(404).send() 
		}
		res.status(200).json({OK:true, device}) 
	}).catch( (e) => {
		res.status(400).send()
    })
})

module.exports = app 