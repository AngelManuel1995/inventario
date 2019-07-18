const mongoose = require('mongoose') 

let DeviceSchema = new mongoose.Schema({
    type:{
        type:String,
		required:true,
		trim:true,
		minlength:1
	},
	ownership:{
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
		unique:true
	},
	city:{
		type:String,
		required:true,
		trim:true,
		minlength:1
	},
	img:{
		type:String,
		minlength:1,
		default:'https://previews.123rf.com/images/ylivdesign/ylivdesign1801/ylivdesign180104316/94067393-icono-de-reparaci%C3%B3n-port%C3%A1til-ilustraci%C3%B3n-de-dibujos-animados-de-icono-de-vector-de-reparaci%C3%B3n-de-port%C3%A1tiles-para-.jpg'
	},
	isToLend:{
		type:Boolean,
		required:true
	},
	state:{
		type:String,
		required:false,
		trim:true,
		enum: ['DISPONIBLE', 'PRESTADO', 'NOPRESTABLE'],
		minlength:1
	}
}) 

const Device = mongoose.model('Device', DeviceSchema ) 

module.exports = Device 