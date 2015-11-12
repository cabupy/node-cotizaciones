/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

var request = require('request');
var cheerio = require('cheerio');
var Q = require('q');

module.exports = {

    getCotizaciones: function(callback) {

        var deferred = Q.defer();

        /* Cambios Chaco */
        var monedascc = [{
            moneda: "Dolar",
            compra: 8,
            venta: 9
        }, {
            moneda: "Peso Argentino",
            compra: 12,
            venta: 13
        }, {
            moneda: "Real",
            compra: 16,
            venta: 17
        }];

        var respuesta = [];

        var optionsRequest = {
            rejectUnauthorized: false,
            url: 'http://www.cambioschaco.com.py/php/imprimir_.php',
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 2500
        };

        request(optionsRequest, function(error, response, html) {

            if (!error) {

                var $ = cheerio.load(html);

                monedascc.map(function(moneda) {
                    respuesta.push({
                        moneda: moneda.moneda,
                        compra: $('tr > td')[moneda.compra].children[0].data.trim().replace('.','').replace(',00',''),
                        venta: $('tr > td')[moneda.venta].children[0].data.trim().replace('.','').replace(',00','')
                    });
                });

                console.log('CambiosChaco: \n' + JSON.stringify( respuesta, null, 2 ) );
                deferred.resolve(respuesta);
            } else {
                deferred.reject(respuesta);
            }
        });

        deferred.promise.nodeify(callback);
        return deferred.promise;

    }
};
