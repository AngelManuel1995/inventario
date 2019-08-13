const mongoose = require('mongoose') 

let InventorySchema = new mongoose.Schema({
	client: {
        name:{
            type:String,
            trim:true,
            required:true
        },
        code:{
            type:String,
            trim:true,
            required:true
        }
	},
    inventory:[
        {
            application:{
                type:String,
                trim:true,
                required:true
            },
            amount: {
                type:Number,
                trim:true,
                required:true
            }
        }
    ]
}) 

const Inventory = mongoose.model('Inventory', InventorySchema ) 

module.exports = Inventory 