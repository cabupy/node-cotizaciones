/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

/* librerias requeridas */
var cheerio = require('cheerio');
var cors = require('cors');
var express = require('express');
var request = require('request');

var Q = require('q');

/* Config */
var Config = require('./config/config');

/* Modulos */
var BancoAmambay = require('./modules/amambay');
var BancoAtlas = require('./modules/atlas');
var BancoBBVA = require('./modules/bbva');
var CambiosAlberdi = require('./modules/cambiosalberdi');
var CambiosChaco = require('./modules/cambioschaco');
var Familiar = require('./modules/familiar');
var Interfisa = require('./modules/interfisa');
var MaxiCambios = require('./modules/maxicambios');
/* Hacemos unas funciones genericas para ahorrarnos lineas y ser educados */
var Generico = require('./modules/generico');

/* /todos */
var agencias = {
    bancoamambay: [],
    bancoatlas: [],
    bancobbva: [],
    cambiosalberdi: [],
    cambioschaco: [],
    familiar: [],
    interfisa: [],
    maxicambios: []
};

/* Instanciamos una app express */
var app = express();

/* Habilitamos CORS a todas las rutas */
app.use(cors());

// Hay que ser educados ...
app.set('x-powered-by', false);

// Agragamos el header powered-by Vamyal S.A. en un middleware
app.use(function(req, res, next) {
    res.header('X-Powered-By', 'Vamyal S.A. <vamyal.com>');
    next();
});

app.get('/bancoamambay', Generico.getGenerico);
app.get('/bancoatlas', Generico.getGenerico);
app.get('/bancobbva', Generico.getGenerico);
app.get('/cambiosalberdi', Generico.getGenerico);
app.get('/cambioschaco', Generico.getGenerico);
app.get('/familiar', Generico.getGenerico);
app.get('/interfisa', Generico.getGenerico);
app.get('/maxicambios', Generico.getGenerico);

app.get('/todos', function(req, res) {

    var promises = [
        BancoAmambay.getCotizaciones(),
        BancoAtlas.getCotizaciones(),
        BancoBBVA.getCotizaciones(),
        CambiosAlberdi.getCotizaciones(),
        CambiosChaco.getCotizaciones(),
        Familiar.getCotizaciones(),
        Interfisa.getCotizaciones(),
        MaxiCambios.getCotizaciones(),
    ];

    Q.allSettled(promises).spread(function(
        BancoAmambay, BancoAtlas, BancoBBVA, CambiosAlberdi, CambiosChaco, Familiar, Interfisa, MaxiCambios
    ) {

        agencias.bancoamambay = (BancoAmambay.state === "fulfilled") ? BancoAmambay.value : [];
        agencias.bancoatlas = (BancoAtlas.state === "fulfilled") ? BancoAtlas.value : [];
        agencias.bancobbva = (BancoBBVA.state === "fulfilled") ? BancoBBVA.value : [];
        agencias.cambiosalberdi = (CambiosAlberdi.state === "fulfilled") ? CambiosAlberdi.value : [];
        agencias.cambioschaco = (CambiosChaco.state === "fulfilled") ? CambiosChaco.value : [];
        agencias.familiar = (Familiar.state === "fulfilled") ? Familiar.value : [];
        agencias.interfisa = (Interfisa.state === "fulfilled") ? Interfisa.value : [];
        agencias.maxicambios = (MaxiCambios.state === "fulfilled") ? MaxiCambios.value : [];

        res.json(agencias);
        res.end();

    }).done();

}); // get /todos

app.get('*', Generico.getGenerico);

var ip = process.env.IP || Config.ip;
var port = process.env.PORT || Config.port;

console.time('Arrancamos el server en');
var server = app.listen(port, ip, function() {
    console.log('Cotizaciones API en http://%s:%s', server.address().address, server.address().port);
    console.timeEnd('Arrancamos el server en');
});

exports = module.exports = app;
