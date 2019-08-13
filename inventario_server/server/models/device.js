const mongoose = require('mongoose') 

let DeviceSchema = new mongoose.Schema({
	ip:{
        type:String,
		required:true,
		trim:true,
		minlength:1
	},
    type:{
        type:String,
		required:true,
		trim:true,
		minlength:1
	},
	brand:{
		type:String,
		required:true,
		trim:true,
		minlength:1
	},
	model:{
		type:String,
		required:true,
		trim:true,
		minlength:1
	},
	name:{
		type:String,
		required:true,
		trim:true,
		minlength:1
	},
	serie:{
		type:String,
		required:true,
		trim:true,
		minlength:1,
		unique:false
	},
	operatingSystem: {
		type:String,
		required:false,
		trim:true,
		minlength:1	
	},
	processor:{
		type:String,
		required:false,
		trim:true,
		minlength:1	
	},
	ramMemory:{
		type:String,
		required:false,
		trim:true,
		minlength:1		
	},
	hardDisk:{
		type:String,
		required:false,
		trim:true,
		minlength:1	
	},
	macAddress: {
		type:String,
		required:false,
		trim:true,
		minlength:1
	},
	img:{
		type:String,
		minlength:1,
		default:'https://previews.123rf.com/images/ylivdesign/ylivdesign1801/ylivdesign180104316/94067393-icono-de-reparaci%C3%B3n-port%C3%A1til-ilustraci%C3%B3n-de-dibujos-animados-de-icono-de-vector-de-reparaci%C3%B3n-de-port%C3%A1tiles-para-.jpg'
	},
	applications:[
		{
			type:String
		}
	], 
	lastDiscovery:{
		type: Date
	}
}) 

const Device = mongoose.model('Device', DeviceSchema ) 

module.exports = Device 