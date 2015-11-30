/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

/* librerias requeridas */
var cors = require('cors');
var db = require('./models/db');
var express = require('express');
var morgan = require('morgan');

/* Config */
var Config = require('./config/config');

/* Instanciamos una app express */
var app = express();
var routes = require('./router/router');

/* Habilitamos CORS a todas las rutas */
app.use(cors());
app.use(morgan('dev'));

app.set('x-powered-by', false);
// Agragamos el header powered-by Vamyal S.A. en un middleware
app.use(function(req, res, next) {
    res.header('X-Powered-By', 'Vamyal S.A. <vamyal.com>');
    next();
});

// Cargamos las rutas habilitadas.
app.use('/', routes);

var ip = process.env.IP || Config.ip;
var port = process.env.PORT || Config.port;

console.time('Arrancamos el server en');
var server = app.listen(port, ip, function() {
    console.log('Cotizaciones API en http://%s:%s', server.address().address, server.address().port);
    console.timeEnd('Arrancamos el server en');
});

exports = module.exports = app;
