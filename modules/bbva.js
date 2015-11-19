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
        var compra = 0;
        var venta = 0;
        var optionsRequest = Config.optionsRequest;
        var fecha_insert = Config.getNow();
        optionsRequest.url = 'https://www.bbva.com.py/Yaguarete/public/quotations';

        request.post(optionsRequest, function(error, response, html) {

            if (!error && response.statusCode == 200) {
                html = JSON.parse(html);
                compra = html[0].cashBuyPrice;
                venta = html[0].cashSellPrice;
                respuesta.push({
                    id: 3,
                    entidad: 'Banco BBVA',
                    moneda: 'Dolar',
                    compra: parseInt(compra),
                    venta: parseInt(venta),
                    spread: parseInt(venta) - parseInt(compra),
                    fecha: fecha_insert,
                });
                compra = 0;
                venta = 0;
                compra = html[1].cashBuyPrice;
                venta = html[1].cashSellPrice;
                respuesta.push({
                    id: 3,
                    entidad: 'Banco BBVA',
                    moneda: 'Euro',
                    compra: parseInt(compra),
                    venta: parseInt(venta),
                    spread: parseInt(venta) - parseInt(compra),
                    fecha: fecha_insert,
                });
                //console.log('BancoBBVA: \n' + JSON.stringify(respuesta, null, 2));
                deferred.resolve(respuesta);

            } else {
                deferred.reject(respuesta);
            }
        });

        deferred.promise.nodeify(callback);
        return deferred.promise;

    }

};
