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
        optionsRequest.url = 'http://www.bancoamambay.com.py/';

        request(optionsRequest, function(error, response, html) {

            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);

                Config.parseBancoAmambay.map(function(moneda) {

                    var compra = $('span.compra')[moneda.posicion].children[0].data.trim().replace('.', '').replace(',00', '');
                    var venta = $('span.venta')[moneda.posicion].children[0].data.trim().replace('.', '').replace(',00', '');

                    respuesta.push({
                        id: 1,
                        entidad: 'Banco Amambay',
                        moneda: moneda.moneda,
                        compra: parseInt(compra),
                        venta: parseInt(venta),
                        spread: parseInt(venta) - parseInt(compra),
                        fecha: fecha_insert,
                    });

                });

                //console.log('BancoAmambay: \n' + JSON.stringify(respuesta, null, 2));
                deferred.resolve(respuesta);

            } else {
                deferred.reject(respuesta);
            }

        });

        deferred.promise.nodeify(callback);
        return deferred.promise;

    }

};
