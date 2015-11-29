/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

var mongoose = require( 'mongoose' );

/* Config */
var Config = require(__dirname + '/../config/config');

var dbURI = Config.dbURI;

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose se ha conectado a: ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose con error al conectarse: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose se ha desconectado.');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose se ha desconectado, cuando la app ha terminado.');
    process.exit(0);
  });
});

// Agregamos los modelos
//require('./cotizaciones.model.js');
