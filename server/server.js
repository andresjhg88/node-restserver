require('./config/config');

const express = require('express')
const app = express()
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())//app.use son midelwers hace referencia a funciones que se disparan cada vez que pase por aqui el codigo.
// cada peticion que se realiza pasa por estas lineas. 
 
app.get('/usuario', function (req, res) {
  res.json('get usuario');
})//El método GET  solicita una representación de un recurso específico. 
//Las peticiones que usan el método GET sólo deben recuperar datos.

app.post('/usuario', function (req, res) {
  let body = req.body;

  if ( body.nombre === undefined ) {
    
    res.status(400).json({

      ok: false,
      mensaje: 'El nombre es necesario'

    });

  } else {
    
    res.json({
      persona: body
    });

  }


})// para crear nuevos registros. Envía los datos para que sean procesados por el recurso identificado. Los datos se incluirán en el cuerpo de la petición.
//Esto puede resultar en la creación de un nuevo recurso o de las actualizaciones de los recursos existentes o ambas cosas.

app.put('/usuario/:id', function(req, res) {

  let id = req.params.id;

  res.json({
    id
  });

})// se utiliza cuando queremos actualizar data., Sube, carga o realiza un upload de un recurso especificado (archivo o fichero) y es un camino más eficiente ya que POST utiliza un mensaje multiparte y el mensaje es decodificado por el servidor.
//En contraste, el método PUT permite escribir un archivo en una conexión socket establecida con el servidor.
//La desventaja del método PUT es que los servidores de alojamiento compartido no lo tienen habilitado.


app.delete('/usuario', function (req, res) {
  res.json('delate usuario');

})// se utiliza para eliminar un usuario, se cambia el estado de algo para que no este disponible, el registro siempre queda.
 
app.listen(process.env.PORT, () => {
    console.log( 'Escuchando el puerro:', process.env.PORT);
});