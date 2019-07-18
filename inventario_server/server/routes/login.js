const express = require('express')
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const SEED = require('../config/config').SEED

const app = express()

app.post('/', (req, res) => {
    User.findOne({email: req.body.user.email}).then((user) => {
       
        if(!user){
            return res.status(400).json({
                OK:false,
                mensaje:'Error al buscar el usuario'
            })
        }

        const token = jwt.sign({user:user}, SEED, {expiresIn:14400})

        res.status(200).json({
            OK:true,
            user:user,
            token:token, 
        })

    }).catch(err => {
        res.send(err)
    })
})

/*app.patch('/cp', (req, res) => {
    let usuario = _.pick(req.body, ['email','password', 'id', 'npassword'])
    Usuario.findOneByEmail(usuario).then((data) => {
        if(data.usuario.length === 0){
            return res.status(404).json({OK:false, erros:{message:`No existe este usuario: ${usuario.email} en la base de datos`}})
        }

        if(!bcrypt.compareSync(usuario.password, data.usuario[0].password)){
            return res.status(400).json({
                OK:false,
                erros:{
                    message:'Contraseña no coinciden'
                }
            })
        }

        return Usuario.actualizaPassword(usuario)

    }).then(data => {
        res.status(200).json({OK:true, data})
    }).catch((err) => {
        res.status(404).json(err)
    })
})*/

module.exports = app