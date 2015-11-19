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
/*var BancoAmambay = require('./modules/amambay');
var BancoAtlas = require('./modules/atlas');
var BancoBBVA = require('./modules/bbva');
var CambiosAlberdi = require('./modules/cambiosalberdi');
var CambiosChaco = require('./modules/cambioschaco');
var Familiar = require('./modules/familiar');
var Interfisa = require('./modules/interfisa');
var MaxiCambios = require('./modules/maxicambios');*/
var Generico = require('./modules/generico');

/* Instanciamos una app express */
var app = express();

/* Habilitamos CORS a todas las rutas */
app.use(cors());

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

    var retorno = [];

    var promises = [
        Generico.getCotizacionesDB(1,'BancoAmambay'),
        Generico.getCotizacionesDB(2,'BancoAtlas'),
        Generico.getCotizacionesDB(3,'BancoBBVA'),
        Generico.getCotizacionesDB(4,'CambiosAlberdi'),
        Generico.getCotizacionesDB(5,'CambiosChaco'),
        Generico.getCotizacionesDB(6,'Familiar'),
        Generico.getCotizacionesDB(7,'Interfisa'),
        Generico.getCotizacionesDB(8,'MaxiCambios'),
    ];

    Q.allSettled(promises).spread(function(
        BancoAmambay, BancoAtlas, BancoBBVA, CambiosAlberdi, CambiosChaco, Familiar, Interfisa, MaxiCambios
    ) {

        retorno.push({
            id: 1,
            entidad: 'Banco Amambay',
            datos: (BancoAmambay.state === "fulfilled") ? BancoAmambay.value : []
        });

        retorno.push({
            id: 2,
            entidad: 'Banco Atlas',
            datos: (BancoAtlas.state === "fulfilled") ? BancoAtlas.value : []
        });

        retorno.push({
            id: 3,
            entidad: 'Banco BBVA',
            datos: (BancoBBVA.state === "fulfilled") ? BancoBBVA.value : []
        });

        retorno.push({
            id: 4,
            entidad: 'Cambios Alberdi',
            datos: (CambiosAlberdi.state === "fulfilled") ? CambiosAlberdi.value : []
        });

        retorno.push({
            id: 5,
            entidad: 'Cambios Chaco',
            datos: (CambiosChaco.state === "fulfilled") ? CambiosChaco.value : []
        });

        retorno.push({
            id: 6,
            entidad: 'Banco Familiar',
            datos: (Familiar.state === "fulfilled") ? Familiar.value : []
        });

        retorno.push({
            id: 7,
            entidad: 'Interfisa Banco',
            datos: (Interfisa.state === "fulfilled") ? Interfisa.value : []
        });

        retorno.push({
            id: 8,
            entidad: 'Maxicambios',
            datos: (MaxiCambios.state === "fulfilled") ? MaxiCambios.value : []
        });

        res.json(retorno);
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
