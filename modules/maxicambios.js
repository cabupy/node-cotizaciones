/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

var cheerio = require('cheerio');
var Q = require('q');
var request = require('request');

/* Config */
var Config = require(__dirname + '/../config/config');

module.exports = {

    getCotizacionesHTML: function(callback) {

        var deferred = Q.defer();
        var respuesta = [];
        var optionsRequest = Config.optionsRequest;
        var fecha_insert = Config.getNow();
        optionsRequest.url = 'http://www.maxicambios.com.py/';

        request(optionsRequest, function(error, response, html) {

            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);

                Config.parseMaxiCambios.map(function(moneda) {
                    var compra = $(moneda.clase)[moneda.posicion].children[moneda.compra].children[0].data.trim().replace('.', '').replace(',00', '');
                    var venta = $(moneda.clase)[moneda.posicion].children[moneda.venta].children[0].data.trim().replace('.', '').replace(',00', '');
                    respuesta.push({
                        id: 8,
                        entidad: 'Maxicambios',
                        moneda: moneda.moneda,
                        compra: parseInt(compra),
                        venta: parseInt(venta),
                        spread: parseInt(venta) - parseInt(compra),
                        fecha: fecha_insert,
                    });
                });

                //console.log('MaxiCambios: \n' + JSON.stringify(respuesta, null, 2));
                deferred.resolve(respuesta);

            } else {
                deferred.reject(respuesta);
            }

        });

        deferred.promise.nodeify(callback);
        return deferred.promise;

    }

};
