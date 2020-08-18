

//[Process]: es un objeto global que que esta corriendo a lo largo de toda la aplicacion de node,
// es actualizado por medio del entorno donde esta corriendo


//=================================
//PUERTO
//=================================

process.env.PORT = process.env.PORT || 3000;


//=================================
//Entorno
//=================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=================================
//Base de Datos
//=================================
let urlDB

if ( process.env.NODE_ENV === 'dev' ){
   urlDB =  'mongodb://localhost:27017/cafe'
}else {
   urlDB = 'mongodb+srv://a88:AUH5ozv3HLaRbvDl@cluster0-xdxcj.mongodb.net/cafe?retryWrites=true&w=majority'
   
}
process.env.URLDB = urlDB;


//mongodb+srv://a88:<password>@cluster0-xdxcj.mongodb.net/test
//'mongodb+srv://a88:AUH5ozv3HLaRbvDl@cluster0-xdxcj.mongodb.net/test?retryWrites=true&w=majority'