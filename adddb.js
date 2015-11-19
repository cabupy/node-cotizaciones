/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

var mongoose = require('mongoose');
var CronJob = require('cron').CronJob;

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
    /* Lunes a Viernes desde las 8:00 cada 1/2 hora hasta las 17:30 */
    new CronJob('00 00,30 8,9,10,11,12,13,14,15,16,17 * * 1-5', recorrerEntidades, null, true, "America/Asuncion");
});

var recorrerEntidades = function() {

    console.time('Guardamos Banco Amambay en');
    Generico.getCotizacionesHTML(BancoAmambay, 'BancoAmambay')
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
            console.log('Banco Amambay volvio vacio: ', error);
        })
        .fin(function() {
            console.timeEnd('Guardamos Banco Amambay en');
        });

    console.time('Guardamos Banco Atlas en');
    Generico.getCotizacionesHTML(BancoAtlas, 'BancoAtlas')
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
            console.log('Banco Atlas volvio vacio: ', error);
        })
        .fin(function() {
            console.timeEnd('Guardamos Banco Atlas en');
        });

    console.time('Guardamos Banco BBVA en');
    Generico.getCotizacionesHTML(BancoBBVA, 'BancoBBVA')
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
            console.log('Banco BBVA volvio vacio: ', error);
        })
        .fin(function() {
            console.timeEnd('Guardamos Banco BBVA en');
        });

    console.time('Guardamos Cambios Alberdi en');
    Generico.getCotizacionesHTML(CambiosAlberdi, 'CambiosAlberdi')
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
            console.log('Cambios Alberdi volvio vacio: ', error);
        })
        .fin(function() {
            console.timeEnd('Guardamos Cambios Alberdi en');
        });

    console.time('Guardamos Cambios Chaco en');
    Generico.getCotizacionesHTML(CambiosChaco, 'CambiosChaco')
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
            console.log('Cambios Chaco volvio vacio: ', error);
        })
        .fin(function() {
            console.timeEnd('Guardamos Cambios Chaco en');
        });

    console.time('Guardamos Interfisa Banco en');
    Generico.getCotizacionesHTML(Interfisa, 'Interfisa')
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
            console.log('Interfisa Banco volvio vacio: ', error);
        })
        .fin(function() {
            console.timeEnd('Guardamos Interfisa Banco en');
        });

    console.time('Guardamos Banco Familiar en');
    Generico.getCotizacionesHTML(Familiar, 'Familiar')
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
            console.log('Banco Familiar volvio vacio: ', error);
        })
        .fin(function() {
            console.timeEnd('Guardamos Banco Familiar en');
        });

    console.time('Guardamos MaxiCambios en');
    Generico.getCotizacionesHTML(MaxiCambios, 'MaxiCambios')
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
            console.log('MaxiCambios volvio vacio: ', error);
        })
        .fin(function() {
            console.timeEnd('Guardamos MaxiCambios en');
        });

};
