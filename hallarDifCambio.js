/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

var mongoose = require('mongoose');
var Q = require('q');

var Cotizaciones = require(__dirname + '/models/cotizaciones.model');

var getHoy = function() {
    var hoy = new Date(Date.now());
    var fecha = new Date(hoy.getFullYear(), hoy.getMonth(),hoy.getDate());
    return fecha;
};

var findCotizacionPrevia = function(id, moneda, fecha, callback) {

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

};

// aca tenemos que pasarle la fecha para recorrer, por ejemplo hoy - 12 horas
var updateDifCambio = function(id, moneda, callback) {

    var deferred = Q.defer();
    var respuesta = [];
    var difcompra = 0;
    var difventa = 0;
    console.time('updateDifCambio(' + id + ', ' + moneda + ')');
    Cotizaciones
        .find({
            id: id,
            moneda: moneda/*,
            fecha: {
                $gte: getHoy()
            },*/
        }, {})
        .sort({
            fecha: -1
        })
        .limit(0)
        .exec(function(error, result) {
            //console.log(result);
            if (!error) {
                console.timeEnd('updateDifCambio(' + id + ', ' + moneda + ')');

                result.map(function(value, index) {

                    findCotizacionPrevia(value.id, value.moneda, value.fecha)
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

};

var recorrido = [{
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
}, ];

recorrido.map(function(value, index) {
    updateDifCambio(value.id, value.moneda);
});
