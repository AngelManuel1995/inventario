const mongoose = require('mongoose') 
const { isEmail } = require('validator')

const Schema = mongoose.Schema

let RegistrySchema = new mongoose.Schema({
    lender:{
        type:Schema.Types.ObjectId,
        ref: 'User',
    },
    receiver:{
        type:String,
        required:true,
        trim:true,
        validate: [ isEmail, 'invalid email' ]
    },
    device:{
        type:Schema.Types.ObjectId,
        ref: 'Device'
    },
    startDate:{
        required:true,
        type:Date
    },
    endDate:{
        required:true,
        type:Date
    },
    ticket:{
        type:String,
        trim:true
    },
    deliveryObservations:{
        required:true,
        type:String,
        trim:true
    },
    feedbackObservations:{
        required:false,
        type:String,
        trim:true,
        default:'PENDIENTE'
    },
    timesLent:{
        type:Number,
        default:1,
        required:true
    }
},{ collection:'registries' }) 

const Registry = mongoose.model('Registry', RegistrySchema ) 

module.exports = Registry 