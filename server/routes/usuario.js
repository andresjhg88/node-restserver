const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Usuario = require('../models/usuario');

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');


const app = express();



app.get('/usuario', verificaToken, (req, res) => {

  // return res.json({

  //   usuario: req.usuario,
  //   nombre: req.usuario.nombre,
  //   email: req.usuario.email,

  // })

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite =Number(limite);

  Usuario.find({estado:true}, 'nombre email role estado google img')
          .skip(desde)
          .limit(limite)
          .exec((err, usuarios)=> {

            if(err){
              return res.status(400).json({
                ok: false,
                err
              });
            }

            Usuario.count({estado:true},(err, conteo)=>{

              res.json({
                ok:true,
                usuarios,
                cuantos: conteo

              });

            })

            

          })
          


})//El método GET  solicita una representación de un recurso específico. 
  //Las peticiones que usan el método GET sólo deben recuperar datos.
  
  app.post('/usuario', [verificaToken, verificaAdmin_Role], function (req, res) {
    let body = req.body;

    let usuario = new Usuario({
      nombre: body.nombre,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10), 
      role: body.role
    });

    usuario.save((err,usuarioDB) =>{
      if(err){
        return res.status(400).json({
          ok: false,
          err
        });
      }

    

      res.json({
        ok: true,
        usuario: usuarioDB
      });

    });
  
  });// para crear nuevos registros. Envía los datos para que sean procesados por el recurso identificado. Los datos se incluirán en el cuerpo de la petición.
  //Esto puede resultar en la creación de un nuevo recurso o de las actualizaciones de los recursos existentes o ambas cosas.
  
  app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
  
    let id = req.params.id;
    let body =_.pick(req.body,['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id,body,{new:true, runValidators: true },(err, usuarioDB) =>{

      if(err){
        return res.status(400).json({
          ok: false,
          err
        });
      };
      
      res.json({
        ok: true,
        usuario: usuarioDB
      });
      

    })
  
  
  })// se utiliza cuando queremos actualizar data., Sube, carga o realiza un upload de un recurso especificado (archivo o fichero) y es un camino más eficiente ya que POST utiliza un mensaje multiparte y el mensaje es decodificado por el servidor.
  //En contraste, el método PUT permite escribir un archivo en una conexión socket establecida con el servidor.
  //La desventaja del método PUT es que los servidores de alojamiento compartido no lo tienen habilitado.
  
  
  app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function (req, res) {

    let id = req.params.id;

    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{

    let cambiaEstado = {

      estado: false

    }

    Usuario.findByIdAndUpdate(id,cambiaEstado,{new:true}, (err, usuarioBorrado) => {

      if(err){
        return res.status(400).json({
          ok: false,
          err
        });
     
     };

     if (!usuarioBorrado){
      
        return res.status(400).json({
          ok: false,
          err:{
            message: 'Usuario no encontrado'
          }
        });
     }

     res.json({
      ok: true,
      usuario: usuarioBorrado
     });

    })

  
  })// se utiliza para eliminar un usuario, se cambia el estado de algo para que no este disponible, el registro siempre queda.

  module.exports = app;