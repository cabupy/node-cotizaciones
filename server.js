/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/


/* librerias requeridas */
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var cors    = require('cors');

/* Modulos */
var MaxiCambios     = require('./modules/maxicambios');
var CambiosChaco    = require('./modules/cambioschaco');
var CambiosAlberdi  = require('./modules/cambiosalberdi');
var BancoAtlas      = require('./modules/atlas');
var Interfisa       = require('./modules/interfisa');
var Familiar        = require('./modules/familiar');

/* /todos */
var agencias = {
    maxicambios: [],
    cambioschaco: [],
    cambiosalberdi: [],
    bancoatlas: [],
    interfisa: [],
    familiar: []
};

/* Instanciamos una app express */
var app = express();

/* Habilitamos CORS a todas las rutas */
app.use(cors());

/* GET para bancoatlas */
app.get('/bancoatlas', function(req, res) {
    agencias.bancoatlas = [];
    console.time('BancoAtlas.getCotizaciones(): ');
    BancoAtlas.getCotizaciones(function(error, result) {
        if (error) {
            res.json(agencias.bancoatlas);
            res.end();
            console.timeEnd('BancoAtlas.getCotizaciones(): ');
        } else {
            agencias.bancoatlas = result;
            res.json(result);
            res.end();
            console.timeEnd('BancoAtlas.getCotizaciones(): ');
        }
    });
});

/* GET para interfisa */
app.get('/interfisa', function(req, res) {
    agencias.interfisa = [];
    console.time('Interfisa.getCotizaciones(): ');
    Interfisa.getCotizaciones(function(error, result) {
        if (error) {
            res.json(agencias.interfisa);
            res.end();
            console.timeEnd('Interfisa.getCotizaciones(): ');
        } else {
            agencias.interfisa = result;
            res.json(result);
            res.end();
            console.timeEnd('Interfisa.getCotizaciones(): ');
        }
    });
});

/* GET para familiar */
app.get('/familiar', function(req, res) {
    agencias.familiar = [];
    console.time('Familiar.getCotizaciones(): ');
    Familiar.getCotizaciones(function(error, result) {
        if (error) {
            res.json(agencias.familiar);
            res.end();
            console.timeEnd('Familiar.getCotizaciones(): ');
        } else {
            agencias.familiar = result;
            res.json(result);
            res.end();
            console.timeEnd('Familiar.getCotizaciones(): ');
        }
    });
});

/* GET para maxicambios */
app.get('/maxicambios', function(req, res) {
    agencias.maxicambios = [];
    console.time('MaxiCambios.getCotizaciones(): ');
    MaxiCambios.getCotizaciones(function(error, result) {
        if (error) {
            res.json(agencias.maxicambios);
            res.end();
            console.timeEnd('MaxiCambios.getCotizaciones(): ');
        } else {
            agencias.maxicambios = result;
            res.json(result);
            res.end();
            console.timeEnd('MaxiCambios.getCotizaciones(): ');
        }
    });
});

/* GET para cambioschaco */
app.get('/cambioschaco', function(req, res) {
    agencias.cambioschaco = [];
    console.time('CambiosChaco.getCotizaciones(): ');
    CambiosChaco.getCotizaciones(function(error, result) {
        if (error) {
            res.json(agencias.cambioschaco);
            res.end();
            console.timeEnd('CambiosChaco.getCotizaciones(): ');
        } else {
            agencias.cambioschaco = result;
            res.json(result);
            res.end();
            console.timeEnd('CambiosChaco.getCotizaciones(): ');
        }
    });
});

/* GET para cambiosalberdi */
app.get('/cambiosalberdi', function(req, res) {
    agencias.cambiosalberdi = [];
    console.time('CambiosAlberdi.getCotizaciones(): ');
    CambiosAlberdi.getCotizaciones(function(error, result) {
        if (error) {
            res.json(agencias.cambiosalberdi);
            res.end();
            console.timeEnd('CambiosAlberdi.getCotizaciones(): ');
        } else {
            agencias.cambiosalberdi = result;
            res.json(result);
            res.end();
            console.timeEnd('CambiosAlberdi.getCotizaciones(): ');
        }
    });
});

/* GET para enviar un JSON con todas las agencias */
app.get('/todos', function(req, res) {
    /* Arrancamos por Alberdi ... luego Chaco y al final Maxi ... */
    agencias.cambiosalberdi = [];
    console.time('CambiosAlberdi.getCotizaciones(): ');
    CambiosAlberdi.getCotizaciones(function(error, result) {
        if (!error) agencias.cambiosalberdi = result;
        console.timeEnd('CambiosAlberdi.getCotizaciones(): ');
        agencias.cambioschaco = [];
        console.time('CambiosChaco.getCotizaciones(): ');
        CambiosChaco.getCotizaciones(function(error, result) {
            if (!error) agencias.cambioschaco = result;
            console.timeEnd('CambiosChaco.getCotizaciones(): ');
            agencias.maxicambios = [];
            console.time('MaxiCambios.getCotizaciones(): ');
            MaxiCambios.getCotizaciones(function(error, result) {
                if (!error) agencias.maxicambios = result;
                console.timeEnd('MaxiCambios.getCotizaciones(): ');
                agencias.bancoatlas = [];
                console.time('BancoAtlas.getCotizaciones(): ');
                BancoAtlas.getCotizaciones(function(error, result) {
                    if (!error) agencias.bancoatlas = result;
                    console.timeEnd('BancoAtlas.getCotizaciones(): ');
                    agencias.interfisa = [];
                    console.time('Interfisa.getCotizaciones(): ');
                    Interfisa.getCotizaciones(function(error, result) {
                        if (!error) agencias.interfisa = result;
                        console.timeEnd('Interfisa.getCotizaciones(): ');
                        agencias.familiar = [];
                        console.time('Familiar.getCotizaciones(): ');
                        Familiar.getCotizaciones(function(error, result) {
                            if (!error) agencias.familiar = result;
                            console.timeEnd('Familiar.getCotizaciones(): ');
                            /* Devolvemos lo que corresponda */
                            res.json(agencias);
                        }); //Familiar
                    }); //Interfisa
                }); //BancoAtlas
            }); //MaxiCambios
        }); // CambiosChaco
    }); // CambiosAlberdi
}); // get /todos

var ip      = process.env.IP || 'localhost';
var port    = process.env.PORT || 3050;

var server = app.listen(port, ip, function() {

    var host = server.address().address;
    var port = server.address().port;
    console.log('Cotizaciones API en http://%s:%s', host, port);

});

exports = module.exports = app;
