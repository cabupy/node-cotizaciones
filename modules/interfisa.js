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

        /* Banco Atlas */
        var monedasif = [{
            moneda: "Dolar",
            compra: 'td#dolar_compra',
            venta: 'td#dolar_venta'
        }, {
            moneda: "Peso Argentino",
            compra: 'td#peso_compra',
            venta: 'td#peso_venta'
        }, {
            moneda: "Real",
            compra: 'td#real_compra',
            venta: 'td#real_venta'
        }, ];

        var respuesta = [];

        var optionsRequest = {
            rejectUnauthorized: false,
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 2500
        };

        request(url, optisonsRequest, function(error, response, html) {

            if (!error) {
                var $ = cheerio.load(html);
                monedasif.map(function(moneda) {
                    respuesta.push({
                        moneda: moneda.moneda,
                        compra: $(moneda.compra)[0].children[0].data.trim().replace('.', '').replace(',00', ''),
                        venta: $(moneda.venta)[0].children[0].data.trim().replace('.', '').replace(',00', '')
                    });
                });
                console.log('InterfisaBanco: \n' + JSON.stringify(respuesta, null, 2));
                deferred.resolve(respuesta);
            } else {
                console.log(error);
                deferred.reject(respuesta);
            }
        });

        deferred.promise.nodeify(callback);
        return deferred.promise;

    }
};
