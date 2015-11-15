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
    getCotizaciones: function(callback) {
        var deferred = Q.defer();
        var respuesta = [];
        var optionsRequest = Config.optionsRequest;
        optionsRequest.url = 'http://www.cambiosalberdi.com/';
        request(optionsRequest, function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                Config.parseCambiosAlberdi.map(function(moneda) {
                    var compra = $('div[class="monedas_ row-fluid"] > div[class="span2 pagination-right"] > p')[moneda.compra].children[0].data.trim().replace('.', '').replace(',00', '');
                    var venta = $('div[class="monedas_ row-fluid"] > div[class="span2 pagination-right"] > p')[moneda.venta].children[0].data.trim().replace('.', '').replace(',00', '');
                    respuesta.push({
                        moneda: moneda.moneda,
                        compra: parseInt(compra),
                        venta: parseInt(venta),
                        spread: parseInt(venta) - parseInt(compra)
                    });
                });
                console.log('CambiosAlberdi: \n' + JSON.stringify(respuesta, null, 2));
                deferred.resolve(respuesta);
            } else {
                deferred.reject(respuesta);
            }
        });
        deferred.promise.nodeify(callback);
        return deferred.promise;
    }
};
