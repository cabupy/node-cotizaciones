/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

var request = require('request');
var cheerio = require('cheerio');
var Q = require('q');

module.exports = {

    getCotizaciones: function(url,callback) {

        var deferred = Q.defer();

        /* Banco Atlas */
        var monedasba = [{
            moneda: "Dolar",
            posicion: 0,
            compra: 6,
            venta: 10
        }, {
            moneda: "Peso Argentino",
            posicion: 3,
            compra: 6,
            venta: 10
        }, {
            moneda: "Real",
            posicion: 2,
            compra: 6,
            venta: 10
        }, ];

        var respuesta = [];

        var optionsRequest = {
            rejectUnauthorized: false,
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 2500
        };

        request(url, optionsRequest, function(error, response, html) {

            if (!error) {

                var $ = cheerio.load(html);

                monedasba.map(function(moneda) {
                    respuesta.push({
                        moneda: moneda.moneda,
                        compra: $('ul#monedas > li')[moneda.posicion].children[moneda.compra].data.trim().replace('.','').replace(',00',''),
                        venta: $('ul#monedas > li')[moneda.posicion].children[moneda.venta].data.trim().replace('.','').replace(',00','')
                    });
                });
                console.log('MaxiCambios: \n' + JSON.stringify( respuesta, null, 2 ) );
                deferred.resolve(respuesta);
            } else {
                deferred.reject(respuesta);
            }
        });

        deferred.promise.nodeify(callback);
        return deferred.promise;

    }
};
