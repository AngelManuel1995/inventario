const mongoose = require('mongoose') 
const { isEmail } = require('validator')

const Schema = mongoose.Schema

const SupplySchema = new mongoose.Schema({
    brand:{
        type:String,
        required:true
    },
    supply:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:false,
        default:'NOAPLICA'
    },
    reference:{
        type:String,
        required:true
    },
    amount: {
        toUse:{
            type:Number,
            required:true
        },
        lentOnes:{
            type:Number,
            required:true
        },
        usedOnes:{
            type:Number,
            required:true
        }
    }
},{ collection:'supplies' }) 

const Supply = mongoose.model('Supply', SupplySchema ) 

module.exports = Supply