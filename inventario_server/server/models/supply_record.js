const mongoose = require('mongoose') 
const Schema = mongoose.Schema

const SupplyRecordSchema = new mongoose.Schema({
    reference:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: new Date()
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User',
    },
    registry: {
        type: {
            type:String,
            required:true
        },
        supplies:[
            {
                type:Schema.Types.ObjectId,
                ref:'Supply',
            }
        ]
    },
    amount: {
        type:Number    
    }
}) 

const SupplyRecord = mongoose.model('SupplyRecord', SupplyRecordSchema ) 

module.exports = SupplyRecord 