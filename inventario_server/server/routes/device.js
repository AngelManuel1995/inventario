const express = require('express')
const Device = require('../models/device')
const { ObjectID } = require('mongodb')
const powershell = require('node-powershell')
const fs = require('fs')
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

app.get('/inventory/all', (req, res) => {
    Device.find().then((devices) => {
        res.status(200).json({OK:true, devices})
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

app.post('/discovery', async (req, res) => {
    
    const { ip } = req.body

    const hardwareSettings = await getHardwareSettings(ip)
    const hardwareSettingsJson = JSON.parse(hardwareSettings)
    const softwareSettings = await getSoftwareSettings(hardwareSettingsJson)
    const softwareSettingsJson = JSON.parse(softwareSettings)
    hardwareSettingsJson.applications = softwareSettingsJson

    Device.findOne({name: hardwareSettingsJson.name}).then((deviceFound) => {
        if(!deviceFound){
            return createDevice(hardwareSettingsJson, res)
        }
        //updateDevice(deviseDiscoveried, res)
    })

})

app.post('/discovery/velez', async (req, res) => {

    //console.log(JSON.parse(req.body.applications))
    req.body.applications = JSON.parse(req.body.applications)
    console.log(req.body)
    res.send({OK:true})
    
    /*const { ip } = req.body

    const hardwareSettings = await getHardwareSettings(ip)
    const hardwareSettingsJson = JSON.parse(hardwareSettings)
    const softwareSettings = await getSoftwareSettings(hardwareSettingsJson)
    const softwareSettingsJson = JSON.parse(softwareSettings)
    hardwareSettingsJson.applications = softwareSettingsJson

    Device.findOne({name: hardwareSettingsJson.name}).then((deviceFound) => {
        if(!deviceFound){
            return createDevice(hardwareSettingsJson, res)
        }
        //updateDevice(deviseDiscoveried, res)
    })*/

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


const updateDevice = (deviceToUpdate, res) => {
    const lastDiscovery = new Date()
    Device.updateOne({name: deviceToUpdate.name}, { $set : { lastDiscovery: lastDiscovery }})
        .then((deviceUpdated) => {
            if(!deviceUpdated){
                return res.send({OK:false, msg:'Error al actualizar el equipo'})
            }
            res.status(200).json({OK:true, deviceUpdated, edited:true, deviceToUpdate})
        }).catch((err) => {
            res.send({OK:false, err})
        })
}

const createDevice = (deviceToCreate, res) => {
    console.log(deviceToCreate)
    const lastDiscovery = new Date()
    const device = new Device({...deviceToCreate,lastDiscovery})
    device.save().then(deviceCreated => {
        if(!deviceCreated){
            return res.status(400).json({OK:false, msg: 'Error al crear el equipo'})
        }
        res.status(200).json({OK:true, deviceCreated})
    }).catch(err => {
        res.status(400).json({OK:false, err})
    })
}

const getHardwareSettings = ( ip ) => {

    let ps = new powershell({
        executionPolicy: 'Bypass',
        noProfile: true
    })

    ps.addCommand("server/powershells/discovery", [
        { ip: ip }
    ])

    return ps.invoke()
}

const getSoftwareSettings = async ( {name} ) => {
    let ps = new powershell({
        executionPolicy: 'Bypass',
        noProfile: true
    })

    ps.addCommand("server/powershells/discoverySoftware", [
        { StrComputer: name }
    ])

    return ps.invoke()
}

module.exports = app 