require('./config/config');

const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())//app.use son midelwers hace referencia a funciones que se disparan cada vez que pase por aqui el codigo.
// cada peticion que se realiza pasa por estas lineas. 

app.use( require('./rutes/usuario') );

mongoose.connect(process.env.URLDB,{

  useNewUrlParser: true,
  useUnifiedTopology: true

})
.then(()=> console.log('Base de Datos ONLINE'))
.catch(err => console.log('No se pudo conectar',err));


app.listen(process.env.PORT, () => {
    console.log( 'Escuchando el puerto:', process.env.PORT);
});

/**
 * ***********************!!ATENCION!!***************************
 *                                                              *
 *     PARA HABILITAR EL SERVICIO LOCAL DE LA BASE DE DATOS     *
 *                                                              *
 *    UTILIZAR: 'mongodb://localhost:27017/cafe' EN LINEA 18    *
 *                                                              *
 *           SE REQUIERE TENER 2 CONSOLAS HABIERTAS             *
 *                                                              *
 * 1na CON EL CODIGO EN EJECUCION DE "nodemon server/server.js" *
 *                                                              *
 *              2da CON "sudo mongod" EN EJECUCION              *
 *                                                              *
 *  DE ESTA FORMA PODEMOS TRABAJAR LOCALMENRE CON EL POSTMAN    *
 *                                                              *
 ****************************************************************
 */

/**
 * ***********************!!ATENCION!!***************************
 *                                                              *
 *    PARA HABILITAR EL SERVICIO ON-LINE EN LA BASE DE DATOS    *
 *                                                              *
 *           UTILIZAR: 'process.env.URLDB' EN LINEA 18          *
 *                                                              *
 *           SE REQUIERE TENER 2 CONSOLAS HABIERTAS             *
 *                                                              *
 * 1na CON EL CODIGO EN EJECUCION DE "nodemon server/server.js" *
 *                                                              *
 *              2da CON "sudo mongod" EN EJECUCION              *
 *                                                              *
 *  DE ESTA FORMA PODEMOS TRABAJAR ON-LINE CON EL POSTMAN       *
 *                                                              *
 * PARA CONCRETAR LA CONECCION DEVEMOS CONECTAR LA APLICACION   *
 * DESDE MONGO ATLAS Y COPIAR LA URL QUE REQUIERE REEMPLAZANDO  *
 * EL NOMBRE DEL USIARIO, PASWORD Y DBNAME QUE SE EXPECIFICA EN *
 * EL ARCHIVO config.js.                                        *
 *                                                              *
 ****************************************************************
 */
