/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

var Q = require('q');

/* Modulos */
var BancoAmambay = require('./amambay');
var BancoAtlas = require('./atlas');
var BancoBBVA = require('./bbva');
var CambiosAlberdi = require('./cambiosalberdi');
var CambiosChaco = require('./cambioschaco');
var Familiar = require('./familiar');
var Interfisa = require('./interfisa');
var MaxiCambios = require('./maxicambios');

var self = module.exports = {

    getUTC : function(){
        return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    },

    getCotizaciones: function(modulo, nombre, callback) {

        var deferred = Q.defer();
        console.time(nombre + '.getCotizaciones()');
        modulo.getCotizaciones()
            .then(function(result) {
                deferred.resolve(result);
            })
            .fail(function(error) {
                deferred.reject(error);
            })
            .fin(function() {
                console.timeEnd(nombre + '.getCotizaciones()');
            });
        deferred.promise.nodeify(callback);
        return deferred.promise;

    },

    getGenerico: function(req, res) {

        switch (req.path) {
            case '/bancoamambay':
                self.getCotizaciones(BancoAmambay, 'BancoAmambay')
                    .then(function(result) {
                        res.json(result);
                    })
                    .fail(function(error) {
                        res.json(error);
                    })
                    .fin(function() {
                        res.end();
                    });
                break;
                case '/bancoatlas':
                    self.getCotizaciones(BancoAtlas, 'BancoAtlas')
                        .then(function(result) {
                            res.json(result);
                        })
                        .fail(function(error) {
                            res.json(error);
                        })
                        .fin(function() {
                            res.end();
                        });
                    break;
                case '/bancobbva':
                    self.getCotizaciones(BancoBBVA, 'BancoBBVA')
                        .then(function(result) {
                            res.json(result);
                        })
                        .fail(function(error) {
                            res.json(error);
                        })
                        .fin(function() {
                            res.end();
                        });
                    break;
                case '/cambiosalberdi':
                    self.getCotizaciones(CambiosAlberdi, 'CambiosAlberdi')
                        .then(function(result) {
                            res.json(result);
                        })
                        .fail(function(error) {
                            res.json(error);
                        })
                        .fin(function() {
                            res.end();
                        });
                    break;
                case '/cambioschaco':
                    self.getCotizaciones(CambiosChaco, 'CambiosChaco')
                        .then(function(result) {
                            res.json(result);
                        })
                        .fail(function(error) {
                            res.json(error);
                        })
                        .fin(function() {
                            res.end();
                        });
                    break;
                case '/familiar':
                    self.getCotizaciones(Familiar, 'Familiar')
                        .then(function(result) {
                            res.json(result);
                        })
                        .fail(function(error) {
                            res.json(error);
                        })
                        .fin(function() {
                            res.end();
                        });
                    break;
                case '/interfisa':
                    self.getCotizaciones(Interfisa, 'Interfisa')
                        .then(function(result) {
                            res.json(result);
                        })
                        .fail(function(error) {
                            res.json(error);
                        })
                        .fin(function() {
                            res.end();
                        });
                    break;
                case '/maxicambios':
                    self.getCotizaciones(MaxiCambios, 'MaxiCambios')
                        .then(function(result) {
                            res.json(result);
                        })
                        .fail(function(error) {
                            res.json(error);
                        })
                        .fin(function() {
                            res.end();
                        });
                    break;
            default:
                var datos = {
                    api: 'API de VAMYAL S.A.',
                    fechaUTC: self.getUTC()
                };
                res.json(datos);
                res.end();
        }

    },

};
