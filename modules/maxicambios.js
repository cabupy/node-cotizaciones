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

        /* Maxi Cambios */
        var monedasmc = [{
            moneda: "Dolar",
            clase: '.lineas1',
            posicion: 0,
            compra: 7,
            venta: 5
        }, {
            moneda: "Peso Argentino",
            clase: '.lineas2',
            posicion: 0,
            compra: 7,
            venta: 5
        }, {
            moneda: "Real",
            clase: '.lineas1',
            posicion: 1,
            compra: 7,
            venta: 5
        }, ];

        var respuesta = [];

        var optionsRequest = {
            rejectUnauthorized: false,
            url: 'http://www.maxicambios.com.py/',
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 2500
        };

        request(optionsRequest, function(error, response, html) {

            if (!error) {

                var $ = cheerio.load(html);

                monedasmc.map(function(moneda) {
                    respuesta.push({
                        moneda: moneda.moneda,
                        compra: $(moneda.clase)[moneda.posicion].children[moneda.compra].children[0].data.trim().replace('.','').replace(',00',''),
                        venta: $(moneda.clase)[moneda.posicion].children[moneda.venta].children[0].data.trim().replace('.','').replace(',00','')
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
