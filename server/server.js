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

mongoose
.connect(process.env.URLDB,{

  useNewUrlParser: true,
  useUnifiedTopology: true

})
.then(()=> console.log('Base de Datos ONLINE'))
.catch(err => console.log('No se pudo conectar',err));


app.listen(process.env.PORT, () => {
    console.log( 'Escuchando el puerro:', process.env.PORT);
});