const express = require('express')
const { User } = require('../models/user')

const app = express()

app.post('/', async (req, res) => {
    const user = new User(req.body.user)
    const token = await user.generateAuthToken()
    try{
        await user.save()
        res.status(201).json({OK:true, user, token})
    }catch(e){
        res.status(400).json({OK:false, e})
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body.user
    try{
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.status(200).json({OK:true, user, token})
    }catch(e){
        console.log(e)
        res.status(400).json({OK:false, e})
    }
})


module.exports = app 