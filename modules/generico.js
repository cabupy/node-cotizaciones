/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

var mongoose = require('mongoose');
var Q = require('q');

var Cotizaciones = require(__dirname + '/../models/cotizaciones.model');

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

    getCotizacionesDB: function(id, nombre, callback) {

        var deferred = Q.defer();
        var respuesta = [];
        console.time(nombre + '.getCotizacionesDB()');
        Cotizaciones.find({ id : id }, {
                _id: 0,
                id: 1,
                entidad: 1,
                moneda: 1,
                compra:1,
                venta: 1,
                spread:1,
                fecha: 1
            }).sort({
                fecha: -1, moneda:1
            }).limit( id==3 ? 2 : 4 ) // *bbva solo cotiza dolar y euro
            .then(function(result) {
                //console.log(result);
                deferred.resolve(result);
                console.timeEnd(nombre + '.getCotizacionesDB()');
            })
            .then(undefined,function(error) {
                deferred.reject(error);
                console.timeEnd(nombre + '.getCotizacionesDB()');
            });

        deferred.promise.nodeify(callback);
        return deferred.promise;
    },

    getCotizacionesHTML: function(modulo, nombre, callback) {

        var deferred = Q.defer();
        console.time(nombre + '.getCotizacionesHTML()');
        modulo.getCotizacionesHTML()
            .then(function(result) {
                deferred.resolve(result);
            })
            .fail(function(error) {
                deferred.reject(error);
            })
            .fin(function() {
                console.timeEnd(nombre + '.getCotizacionesHTML()');
            });
        deferred.promise.nodeify(callback);
        return deferred.promise;

    },

    getGenerico: function(req, res) {

        switch (req.path) {
            case '/bancoamambay':
                self.getCotizacionesDB(1, 'BancoAmambay')
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
                    self.getCotizacionesDB(2, 'BancoAtlas')
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
                    self.getCotizacionesDB(3, 'BancoBBVA')
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
                    self.getCotizacionesDB(4, 'CambiosAlberdi')
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
                    self.getCotizacionesDB(5, 'CambiosChaco')
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
                    self.getCotizacionesDB(6, 'Familiar')
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
                    self.getCotizacionesDB(7, 'Interfisa')
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
                    self.getCotizacionesDB(8, 'MaxiCambios')
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
