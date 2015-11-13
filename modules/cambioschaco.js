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
        optionsRequest.url = 'http://www.cambioschaco.com.py/php/imprimir_.php';
        request(optionsRequest, function(error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                Config.parseCambiosChaco.map(function(moneda) {
                    var compra = $('tr > td')[moneda.compra].children[0].data.trim().replace('.', '').replace(',00', '');
                    var venta = $('tr > td')[moneda.venta].children[0].data.trim().replace('.', '').replace(',00', '');
                    respuesta.push({
                        moneda: moneda.moneda,
                        compra: parseInt(compra),
                        venta:  parseInt(venta),
                        spread: parseInt(venta) - parseInt(compra)
                    });
                });
                console.log('CambiosChaco: \n' + JSON.stringify(respuesta, null, 2));
                deferred.resolve(respuesta);
            } else {
                deferred.reject(respuesta);
            }
        });
        deferred.promise.nodeify(callback);
        return deferred.promise;
    }
};
