const express = require('express')
const Supply = require('../models/supply')
const SupplyRecord = require('../models/supply_record')
const app = express()

app.get('/', (req, res) => {
    Supply.find().then((supplies) => {
       res.status(200).json({OK:true, supplies})
    }).catch((error) => {
        res.status(400).json({OK:false, error})
    })
})

app.post('/', (req, res) => {
    const supply = new Supply({...req.body.supply})
    supply.save().then((newSupply) => {
       res.status(200).json({OK:true, newSupply})
    }).catch((error) => {
        res.status(400).json({OK:false, error})
    })
})

app.patch('/recharge', (req, res) => {

    const { suppliesToRecharge, amountToRecharge, type } = req.body
    let newAmount = 0
    if(type === 'LOAD'){
        newAmount = parseInt(amountToRecharge.value.amount)
    }else {
        newAmount = parseInt(amountToRecharge.value.amount) * - 1
    }

    const ids = getIdToRecharge(suppliesToRecharge)
    Supply.updateMany({ $or:ids }, {$inc: {"amount.toUse": newAmount}}).then((suppliesUpdated) => {
        if(!suppliesUpdated.ok){
            return res.status(400).send({OK:true, error:{msg:'No se pudo actualizar'}})
        }
        const supplyRecord = new SupplyRecord(createSupplyRecord(amountToRecharge.value.invoiceNumber, type, ids, amountToRecharge.value.amount))
        return supplyRecord.save()
    }).then((supplyRecordCreated) => {
        return Supply.find({$or:ids})
    }).then((updates) => {
        res.status(200).send({OK:true, updates})
    }).catch((error) => {
        res.status(400).send({OK:false, error})
    })
})

const getIdToRecharge = (supplies) => {
    return supplies.map(({ _id }) => {
        return { _id }
    })
}

app.get('/:id', (req, res) => {
    const supply = req.params.id
    SupplyRecord.find({"registry.supplies": supply}).populate("registry.supplies", "color brand supply type reference").populate("user", 'name').then((supplyRecords) => {
        res.status(200).json({OK:true, supplyRecords})
    }).catch((error) => {
        res.status(400).json({OK:false, error})
    })
})

const createSupplyRecord = (reference, type, ids, amount) => {
    return {
        reference,
        user:"5cf6d39fc298637812948e65",
        registry:{
            type,
            supplies: ids
        },
        amount:amount
    }
}

module.exports = app 