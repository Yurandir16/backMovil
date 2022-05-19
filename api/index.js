const express = require ('express');

const config = require('../Config.js')
const user = require('./components/user/network')

const app = express();

app.use('/api/user', user);
//servidor activo
app.listen(config.api.port, ()=>{
    console.log('Servidor corriendo en el puerto =>', config.api.port);
});
