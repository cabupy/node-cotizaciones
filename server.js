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

app.set('x-powered-by', false);

// Agragamos el header powered-by Vamyal S.A. en un middleware
app.use(function(req, res, next) {
    res.header('X-Powered-By', 'Vamyal S.A. <vamyal.com>');
    next();
});

/* GET para bancoamambay */
app.get('/bancoamambay', function(req, res) {
    agencias.bancoamambay = [];
    console.time('BancoAmambay.getCotizaciones()');
    BancoAmambay.getCotizaciones()
        .then(function(result) {
            agencias.bancoamambay = result;
            res.json(result);
        })
        .fail(function(error) {
            res.json(agencias.bancoamambay);
        })
        .fin(function() {
            res.end();
            console.timeEnd('BancoAmambay.getCotizaciones()');
        });
});

/* GET para bancoatlas */
app.get('/bancoatlas', function(req, res) {
    agencias.bancoatlas = [];
    console.time('BancoAtlas.getCotizaciones()');
    BancoAtlas.getCotizaciones()
        .then(function(result) {
            agencias.bancoatlas = result;
            res.json(result);
        })
        .fail(function(error) {
            res.json(agencias.bancoatlas);
        })
        .fin(function() {
            res.end();
            console.timeEnd('BancoAtlas.getCotizaciones()');
        });
});

/* GET para bancobbva */
app.get('/bancobbva', function(req, res) {
    agencias.bancobbva = [];
    console.time('BancoBBVA.getCotizaciones()');
    BancoBBVA.getCotizaciones()
        .then(function(result) {
            agencias.bancobbva = result;
            res.json(result);
        })
        .fail(function(error) {
            res.json(agencias.bancobbva);
        })
        .fin(function() {
            res.end();
            console.timeEnd('BancoBBVA.getCotizaciones()');
        });
});

/* GET para interfisa */
app.get('/interfisa', function(req, res) {
    agencias.interfisa = [];
    console.time('Interfisa.getCotizaciones()');
    Interfisa.getCotizaciones()
        .then(function(result) {
            agencias.interfisa = result;
            res.json(result);
        })
        .fail(function(error) {
            res.json(agencias.interfisa);
        })
        .fin(function() {
            res.end();
            console.timeEnd('Interfisa.getCotizaciones()');
        });
});

/* GET para familiar */
app.get('/familiar', function(req, res) {
    agencias.familiar = [];
    console.time('Familiar.getCotizaciones()');
    Familiar.getCotizaciones()
        .then(function(result) {
            agencias.familiar = result;
            res.json(result);
        })
        .fail(function(error) {
            res.json(agencias.familiar);
        })
        .fin(function() {
            res.end();
            console.timeEnd('Familiar.getCotizaciones()');
        });
});

/* GET para maxicambios */
app.get('/maxicambios', function(req, res) {
    agencias.maxicambios = [];
    console.time('MaxiCambios.getCotizaciones()');
    MaxiCambios.getCotizaciones()
        .then(function(result) {
            agencias.maxicambios = result;
            res.json(result);
        })
        .fail(function(error) {
            res.json(agencias.maxicambios);
        })
        .fin(function() {
            res.end();
            console.timeEnd('MaxiCambios.getCotizaciones()');
        });
});

/* GET para cambioschaco */
app.get('/cambioschaco', function(req, res) {
    agencias.cambioschaco = [];
    console.time('CambiosChaco.getCotizaciones()');
    CambiosChaco.getCotizaciones()
        .then(function(result) {
            agencias.cambioschaco = result;
            res.json(result);
        })
        .fail(function(error) {
            res.json(agencias.cambioschaco);
        })
        .fin(function() {
            res.end();
            console.timeEnd('CambiosChaco.getCotizaciones()');
        });
});

/* GET para cambiosalberdi */
app.get('/cambiosalberdi', function(req, res) {
    agencias.cambiosalberdi = [];
    console.time('CambiosAlberdi.getCotizaciones()');
    CambiosAlberdi.getCotizaciones()
        .then(function(result) {
            agencias.cambiosalberdi = result;
            res.json(result);
        })
        .fail(function(error) {
            res.json(agencias.cambiosalberdi);
        })
        .fin(function() {
            res.end();
            console.timeEnd('CambiosAlberdi.getCotizaciones()');
        });
});

/* GET para enviar un JSON con todas las agencias */
app.get('/todos', function(req, res) {
    agencias.cambiosalberdi = [];
    console.time('CambiosAlberdi.getCotizaciones()');
    CambiosAlberdi.getCotizaciones(function(error, result) {
        if (!error) agencias.cambiosalberdi = result;
        console.timeEnd('CambiosAlberdi.getCotizaciones()');
        agencias.cambioschaco = [];
        console.time('CambiosChaco.getCotizaciones()');
        CambiosChaco.getCotizaciones(function(error, result) {
            if (!error) agencias.cambioschaco = result;
            console.timeEnd('CambiosChaco.getCotizaciones()');
            agencias.maxicambios = [];
            console.time('MaxiCambios.getCotizaciones()');
            MaxiCambios.getCotizaciones(function(error, result) {
                if (!error) agencias.maxicambios = result;
                console.timeEnd('MaxiCambios.getCotizaciones()');
                agencias.bancoatlas = [];
                console.time('BancoAtlas.getCotizaciones()');
                BancoAtlas.getCotizaciones(function(error, result) {
                    if (!error) agencias.bancoatlas = result;
                    console.timeEnd('BancoAtlas.getCotizaciones()');
                    agencias.interfisa = [];
                    console.time('Interfisa.getCotizaciones()');
                    Interfisa.getCotizaciones(function(error, result) {
                        if (!error) agencias.interfisa = result;
                        console.timeEnd('Interfisa.getCotizaciones()');
                        agencias.familiar = [];
                        console.time('Familiar.getCotizaciones()');
                        Familiar.getCotizaciones(function(error, result) {
                            if (!error) agencias.familiar = result;
                            console.timeEnd('Familiar.getCotizaciones()');
                            agencias.bancobbva = [];
                            console.time('BancoBBVA.getCotizaciones()');
                            BancoBBVA.getCotizaciones(function(error, result) {
                                if (!error) agencias.bancobbva = result;
                                console.timeEnd('BancoBBVA.getCotizaciones()');
                                agencias.bancoamambay = [];
                                console.time('BancoAmambay.getCotizaciones()');
                                BancoAmambay.getCotizaciones(function(error, result) {
                                    if (!error) agencias.bancoamambay = result;
                                    console.timeEnd('BancoAmambay.getCotizaciones()');
                                    /* Devolvemos lo que corresponda */
                                    res.json(agencias);
                                }); //BancoAmambay
                            }); //BancoBBVA
                        }); //Familiar
                    }); //Interfisa
                }); //BancoAtlas
            }); //MaxiCambios
        }); // CambiosChaco
    }); // CambiosAlberdi
}); // get /todos

app.get('*', function(req, res) {
    var fecha = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var datos = {
        api: 'API de VAMYAL S.A.',
        fechaUTC: fecha
    };
    res.json(datos);
});

var ip = process.env.IP || Config.ip;
var port = process.env.PORT || Config.port;

var server = app.listen(port, ip, function() {

    var host = server.address().address;
    var port = server.address().port;
    console.log('Cotizaciones API en http://%s:%s', host, port);

});

exports = module.exports = app;
