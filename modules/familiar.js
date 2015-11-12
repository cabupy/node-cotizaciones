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

        /* Banco Familiar */
        var monedasfa = [{
            moneda: "Dolar",
            clase: 'div#wrapper-banner > div.wrapper > div.sidebar > div#content > div#slider > ul > li > span#dolar'
        }, {
            moneda: "Peso Argentino",
            clase: 'div#wrapper-banner > div.wrapper > div.sidebar > div#content > div#slider > ul > li > span#peso'
        }, {
            moneda: "Real",
            clase: 'div#wrapper-banner > div.wrapper > div.sidebar > div#content > div#slider > ul > li > span#real'
        }, ];

        var respuesta = [];

        var optionsRequest = {
            rejectUnauthorized: false,
            url: 'https://www.familiar.com.py/',
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 3000
        };

        request(optionsRequest, function(error, response, html) {

            if (!error) {
                var $ = cheerio.load(html);
                monedasfa.map(function(moneda) {
                    respuesta.push({
                        moneda: moneda.moneda,
                        compra: $(moneda.clase)[0].next.children[0].data.trim().replace('C:', '').replace('.', '').replace(',00', ''),
                        venta: $(moneda.clase)[0].next.next.children[0].data.trim().replace('V:', '').replace('.', '').replace(',00', '')
                    });
                });
                console.log('Familiar: \n' + JSON.stringify(respuesta, null, 2));
                deferred.resolve(respuesta);
            } else {
                deferred.reject(respuesta);
            }
        });

        deferred.promise.nodeify(callback);
        return deferred.promise;

    }
};
