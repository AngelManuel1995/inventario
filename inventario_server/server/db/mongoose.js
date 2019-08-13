const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/invetario');

// mongoose.connection.openUri(`mongodb://inventario:inventario@127.0.0.1:27017/inventario`, (err, res) => {
//     if (err) throw err
//     console.log('Base de datos: \x1b[32m%s\x1b[0m', 'Online')
// })


module.exports = { mongoose }