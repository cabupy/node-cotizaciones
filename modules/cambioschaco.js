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
        optionsRequest.url = 'http://www.cambioschaco.com.py/php/imprimir_.php';

        request(optionsRequest, function(error, response, html) {

            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);

                Config.parseCambiosChaco.map(function(moneda) {
                    var compra = $('tr > td')[moneda.compra].children[0].data.trim().replace('.', '').replace(',00', '');
                    var venta = $('tr > td')[moneda.venta].children[0].data.trim().replace('.', '').replace(',00', '');
                    respuesta.push({
                        id: 5,
                        entidad: 'Cambios Chaco',
                        moneda: moneda.moneda,
                        compra: parseInt(compra),
                        venta:  parseInt(venta),
                        spread: parseInt(venta) - parseInt(compra),
                        fecha: fecha_insert,
                    });
                });

                //console.log('CambiosChaco: \n' + JSON.stringify(respuesta, null, 2));
                deferred.resolve(respuesta);

            } else {
                deferred.reject(respuesta);
            }

        });

        deferred.promise.nodeify(callback);
        return deferred.promise;

    }

};
