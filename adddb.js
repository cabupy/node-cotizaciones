/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

var mongoose = require('mongoose');
var CronJob = require('cron').CronJob;

var db = require('./models/db');
var Cotizaciones = require('./models/cotizaciones.model');

var BancoAmambay = require('./modules/amambay');
var BancoAtlas = require('./modules/atlas');
var BancoBBVA = require('./modules/bbva');
var CambiosAlberdi = require('./modules/cambiosalberdi');
var CambiosChaco = require('./modules/cambioschaco');
var Familiar = require('./modules/familiar');
var Interfisa = require('./modules/interfisa');
var MaxiCambios = require('./modules/maxicambios');
var Generico = require('./modules/generico');

mongoose.connection.once('connected', function() {
    console.log("Conectados a la base de datos.");
    //recorrerEntidades();
    //ctrlDifCambio();
    /* Lunes a Viernes desde las 8:00 cada 1/2 hora hasta las 17:30 */
    //new CronJob('00 00,30 8,9,10,11,12,13,14,15,16,17 * * 1-5', recorrerEntidades, null, true, "America/Asuncion");
    //new CronJob('10 00,30 8,9,10,11,12,13,14,15,16,17 * * 1-5', ctrlDifCambio, null, true, "America/Asuncion");
});

var ctrlDifCambio = function(){
    Generico.recorrido.map(function(value, index) {
        Generico.updateDifCambio(value.id, value.moneda);
    });
};

var recorrerEntidades = function() {

    var getCotizacionesHTMLlocal = function(modulo, nombre){

        console.time('Guardamos '+ nombre +' en');
        Generico.getCotizacionesHTML(modulo, nombre)
            .then(function(result) {
                result.map(function(value) {
                    var cotizacion = new Cotizaciones(value);
                    cotizacion.save(function(err) {
                        if (err) throw err;
                        //console.log('Cotizaciones guardada satisfactoriamente!');
                    });
                });
            })
            .fail(function(error) {
                console.log(nombre + ' volvio vacio: ', error);
            })
            .fin(function() {
                console.timeEnd('Guardamos '+ nombre +' en');
            });

    };

    getCotizacionesHTMLlocal(BancoAmambay, 'BancoAmambay');
    getCotizacionesHTMLlocal(BancoAtlas, 'BancoAtlas');
    getCotizacionesHTMLlocal(BancoBBVA, 'BancoBBVA');
    getCotizacionesHTMLlocal(CambiosAlberdi, 'CambiosAlberdi');
    getCotizacionesHTMLlocal(CambiosChaco, 'CambiosChaco');
    getCotizacionesHTMLlocal(Interfisa, 'Interfisa');
    getCotizacionesHTMLlocal(Familiar, 'Familiar');
    getCotizacionesHTMLlocal(MaxiCambios, 'MaxiCambios');

};
