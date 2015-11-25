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

    getUTC: function() {
        return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    },

    /**
     * @name getHoy
     * @desc Devuelve la fecha de hoy con hhmmss = 000000
     * @returns {Date}
     */
    getHoy: function() {
        var hoy = new Date(Date.now());
        var fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
        return fecha;
    },

    findCotizacionPrevia: function(id, moneda, fecha, callback) {

        var deferred = Q.defer();
        var respuesta = [];
        //console.time('findCotizacionPrevia()');
        Cotizaciones
            .find({
                id: id,
                moneda: moneda,
                fecha: {
                    $lt: fecha
                }
            }, {
                _id: 0,
                compra: 1,
                venta: 1,
            })
            .sort({
                fecha: -1
            })
            .limit(1)
            .exec(function(error, result) {
                //console.log(result);
                if (!error) {
                    deferred.resolve(result);
                } else {
                    deferred.reject(respuesta);
                }
                //console.timeEnd('findCotizacionPrevia()');
            });

        deferred.promise.nodeify(callback);
        return deferred.promise;

    },

    // aca tenemos que pasarle la fecha para recorrer, por ejemplo hoy - 12 horas
    updateDifCambio: function(id, moneda, callback) {

        var deferred = Q.defer();
        var respuesta = [];
        var difcompra = 0;
        var difventa = 0;
        console.time('updateDifCambio(' + id + ', ' + moneda + ')');
        Cotizaciones
            .find({
                id: id,
                moneda: moneda,
                fecha: {
                    $gte: self.getHoy()
                },
            }, {})
            .sort({
                fecha: -1
            })
            .limit(0)
            .exec(function(error, result) {

                if (!error) {
                    console.timeEnd('updateDifCambio(' + id + ', ' + moneda + ')');

                    result.map(function(value, index) {

                        self.findCotizacionPrevia(value.id, value.moneda, value.fecha)
                            .then(function(result) {

                                if (result.length > 0) {

                                    difcompra = value.compra - result[0].compra;
                                    difventa = value.venta - result[0].venta;

                                    var conditions = {
                                            _id: value._id
                                        },
                                        update = {
                                            $set: {
                                                difcompra: difcompra,
                                                difventa: difventa
                                            }
                                        },
                                        options = {
                                            multi: true
                                        };

                                    Cotizaciones.update(conditions, update, options, function(err, numAffected) {

                                        if (!err) {
                                            //console.log(numAffected);
                                        } else {
                                            console.log(err);
                                        }

                                    });
                                    //console.log(value.id, value.moneda, value.compra, result[0].compra, value.compra - result[0].compra);
                                    //console.log(value.id, value.moneda, value.venta, result[0].venta, value.venta - result[0].venta);
                                }

                            }).fail(function(error) {
                                console.log(error);
                            });
                        //console.log(value);
                    }); // map

                } else {
                    console.log(error);
                }
            });

        deferred.promise.nodeify(callback);
        return deferred.promise;

    },

    getCotizacionesDB: function(id, nombre, callback) {

        var deferred = Q.defer();
        var respuesta = [];
        console.time(nombre + '.getCotizacionesDB()');
        Cotizaciones.find({
                id: id
            }, {
                _id: 0,
                id: 1,
                entidad: 1,
                moneda: 1,
                compra: 1,
                venta: 1,
                spread: 1,
                difcompra: 1,
                difventa: 1,
                fecha: 1
            }).sort({
                fecha: -1,
                moneda: 1
            }).limit(id == 3 ? 2 : 4) // *bbva solo cotiza dolar y euro
            .exec(function(error, result) {
                //console.log(result);
                if (!error) {
                    deferred.resolve(result);
                } else {
                    deferred.reject(respuesta);
                }
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

    recorrido: [{
        id: 1,
        moneda: 'Dolar',
    }, {
        id: 1,
        moneda: 'Euro',
    }, {
        id: 1,
        moneda: 'Peso Argentino',
    }, {
        id: 1,
        moneda: 'Real',
    }, {
        id: 2,
        moneda: 'Dolar',
    }, {
        id: 2,
        moneda: 'Euro',
    }, {
        id: 2,
        moneda: 'Peso Argentino',
    }, {
        id: 2,
        moneda: 'Real',
    }, {
        id: 3,
        moneda: 'Dolar',
    }, {
        id: 3,
        moneda: 'Euro',
    }, {
        id: 4,
        moneda: 'Dolar',
    }, {
        id: 4,
        moneda: 'Euro',
    }, {
        id: 4,
        moneda: 'Peso Argentino',
    }, {
        id: 4,
        moneda: 'Real',
    }, {
        id: 5,
        moneda: 'Dolar',
    }, {
        id: 5,
        moneda: 'Euro',
    }, {
        id: 5,
        moneda: 'Peso Argentino',
    }, {
        id: 5,
        moneda: 'Real',
    }, {
        id: 6,
        moneda: 'Dolar',
    }, {
        id: 6,
        moneda: 'Euro',
    }, {
        id: 6,
        moneda: 'Peso Argentino',
    }, {
        id: 6,
        moneda: 'Real',
    }, {
        id: 7,
        moneda: 'Dolar',
    }, {
        id: 7,
        moneda: 'Euro',
    }, {
        id: 7,
        moneda: 'Peso Argentino',
    }, {
        id: 7,
        moneda: 'Real',
    }, {
        id: 8,
        moneda: 'Dolar',
    }, {
        id: 8,
        moneda: 'Euro',
    }, {
        id: 8,
        moneda: 'Peso Argentino',
    }, {
        id: 8,
        moneda: 'Real',
    }, ],

};
