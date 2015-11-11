/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

var request = require('request');
var cheerio = require('cheerio');
var Q = require('q');

module.exports = {

    getCotizaciones: function(url, callback) {

        var deferred = Q.defer();

        /* Cambios Alberdi */
        var monedasal = [{
            moneda: "Dolar",
            compra: 0,
            venta: 1
        }, {
            moneda: "Peso Argentino",
            compra: 2,
            venta: 3
        }, {
            moneda: "Real",
            compra: 4,
            venta: 5
        }];

        var respuesta = [];

        request(url, function(error, response, html) {

            if (!error) {

                var $ = cheerio.load(html);

                monedasal.map(function(moneda) {
                    respuesta.push({
                        moneda: moneda.moneda,
                        compra: $('div[class="monedas_ row-fluid"] > div[class="span2 pagination-right"] > p')[moneda.compra].children[0].data.trim().replace('.','').replace(',00',''),
                        venta: $('div[class="monedas_ row-fluid"] > div[class="span2 pagination-right"] > p')[moneda.venta].children[0].data.trim().replace('.','').replace(',00','')
                    });
                });

                console.log('CambiosAlberdi: \n' + JSON.stringify( respuesta, null, 2 ) );
                deferred.resolve(respuesta);
            } else {
                deferred.reject(respuesta);
            }
        });

        deferred.promise.nodeify(callback);
        return deferred.promise;

    }
};
