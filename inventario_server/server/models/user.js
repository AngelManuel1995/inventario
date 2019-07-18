const mongoose = require('mongoose') 
const validator = require('validator') 
const jwt = require('jsonwebtoken') 
const _ = require('lodash') 
const bcrypt = require('bcryptjs')
const SEED = require('../config/config').SEED

const userSchema = new mongoose.Schema({
    name:{
        type:String,
		required:true,
		trim:true,
		minlength:1,
    },
	email:{
		type:String,
		required:true,
		trim:true,
		minlength:1,
		unique:true,
		validate:{
			validator:validator.isEmail,
			message:'{VALUE} is not a valid email'
		}
	},
	password:{
		type:String,
		required:true,
		trim:true,
		minlength:6
	},
	tokens:[{
		token:{
			type:String,
			required:true
		}
	}],
	isAdmin:{
		type:Boolean,
		required:true,
		default:false
	}
}) 

userSchema.methods.toJSON = function () {
	let user = this 
	let userObject = user.toObject() 

	return _.pick(userObject,['_id','email', 'name', 'tokens']) 
}


userSchema.methods.generateAuthToken = async function(){
	const user = this 
	const token = jwt.sign({_id: user._id.toString()}, SEED)
	user.tokens = user.tokens.concat({ token })
	await user.save()
	return token
} 

/*userSchema.methods.generateAuthToken = function(){
	let user = this  
	let access = 'auth' 
	let token = jwt.sign( { _id: user._id.toHexString(), access }, '5991legna' ) 

	user.tokens = user.tokens.concat([{access, token}]) 

	return user.save().then( () => {
		return token 
	})
} */

/*userSchema.statics.findByToken = function( token ){
	let User = this 
	let decoded 

	try{
		decoded = jwt.verify(token, '5991legna')
	}catch(e){
		return Promise.reject()
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token':token,
		'tokens.access':'auth'
	})
}*/


userSchema.statics.findByCredentials = async (email, password) => {

	const user = await User.findOne({email})

	if(!user){
		throw new Error('No se puede hacer el registro')
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if(!isMatch){
		throw new Error('No se pudo hacer el registro')
	}

	return user
}

userSchema.pre('save', async function(next){
	let user = this

	if(user.isModified('password')){
		user.password = await bcrypt.hash(user.password, 8)
	}else{
		next()
	}

})

/*userSchema.methods.removeToken = function( token ){
	let user = this
	
  return user.update({
		$pull:{
			tokens:{ token }
		}
	})
}*/

const User = mongoose.model( 'User', userSchema ) 

module.exports = { User } 