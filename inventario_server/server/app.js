const { mongoose } = require('./db/mongoose')
const express = require('express') 
const bodyParse = require('body-parser') 
const core = require('./core/cores')

const app = express() 


//Middlewares
app.use(core);
app.use(bodyParse.json()) 

//Importaciones Locales
const deviceRoutes = require('./routes/device')
const registryRoutes = require('./routes/registry')
const supplyRoutes = require('./routes/supply')
const queryRoutes = require('./routes/query')
const userRoutes = require('./routes/user')

//Implementacion de las rutas.
app.use('/device', deviceRoutes)
app.use('/registry', registryRoutes)
app.use('/supply', supplyRoutes)
app.use('/query', queryRoutes)
app.use('/user', userRoutes)


app.listen('3000', () => {
	console.log('Started on 3000 port')
})

module.exports = { app } 