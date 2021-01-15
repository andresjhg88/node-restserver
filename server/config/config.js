

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
// Vencimiento del Token
//=================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo'

//=================================
// SEED (semilla) de autenticacion
//=================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = '48h';


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

//=================================
//Google Client ID
//=================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '481801740789-jej6ehe54kevtjhn9maf8cldlpnq6c7l.apps.googleusercontent.com';


//mongodb+srv://a88:<password>@cluster0-xdxcj.mongodb.net/test
//'mongodb+srv://a88:AUH5ozv3HLaRbvDl@cluster0-xdxcj.mongodb.net/test?retryWrites=true&w=majority'