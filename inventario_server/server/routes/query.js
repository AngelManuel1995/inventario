const express = require('express')
const Registry = require('../models/registry')
const Device = require('../models/device')
const User = require('../models/user')
const app = express()

app.get('/', (req, res) => {
   Registry.aggregate([
        { $match : { } },
        { $group : { _id : { device: "$device" }, count: { $sum: 1 } } },
        { $lookup: { from: 'devices', localField: '_id.device', foreignField: '_id', as: 'info'}},
        { $sort: { count: -1 } },
        { $limit: 5 }
        
    ]).then((summary) => {
       res.status(200).json({OK:true, summary})
   }).catch((error) => {
       res.status(400).json({OK:false, error})
   })
})

app.get('/:id', (req, res) => {

})


module.exports = app 
