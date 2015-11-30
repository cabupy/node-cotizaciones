/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

/* librerias requeridas */
var express = require('express');
var Q = require('q');
var router = express.Router();

/* Modulos */
var Generico = require('../modules/generico');

router.get('/bancoamambay', Generico.getGenerico);
router.get('/bancoatlas', Generico.getGenerico);
router.get('/bancobbva', Generico.getGenerico);
router.get('/cambiosalberdi', Generico.getGenerico);
router.get('/cambioschaco', Generico.getGenerico);
router.get('/familiar', Generico.getGenerico);
router.get('/interfisa', Generico.getGenerico);
router.get('/maxicambios', Generico.getGenerico);

router.get('/todos', function(req, res) {

    var retorno = [];

    var promises = [
        Generico.getCotizacionesDB(1,'BancoAmambay'),
        Generico.getCotizacionesDB(2,'BancoAtlas'),
        Generico.getCotizacionesDB(3,'BancoBBVA'),
        Generico.getCotizacionesDB(4,'CambiosAlberdi'),
        Generico.getCotizacionesDB(5,'CambiosChaco'),
        Generico.getCotizacionesDB(6,'Familiar'),
        Generico.getCotizacionesDB(7,'Interfisa'),
        Generico.getCotizacionesDB(8,'MaxiCambios'),
    ];

    Q.allSettled(promises).spread(function(
        BancoAmambay, BancoAtlas, BancoBBVA, CambiosAlberdi, CambiosChaco, Familiar, Interfisa, MaxiCambios
    ) {

        retorno.push({
            id: 1,
            entidad: 'Banco Amambay',
            datos: (BancoAmambay.state === "fulfilled") ? BancoAmambay.value : []
        });

        retorno.push({
            id: 2,
            entidad: 'Banco Atlas',
            datos: (BancoAtlas.state === "fulfilled") ? BancoAtlas.value : []
        });

        retorno.push({
            id: 3,
            entidad: 'Banco BBVA',
            datos: (BancoBBVA.state === "fulfilled") ? BancoBBVA.value : []
        });

        retorno.push({
            id: 4,
            entidad: 'Cambios Alberdi',
            datos: (CambiosAlberdi.state === "fulfilled") ? CambiosAlberdi.value : []
        });

        retorno.push({
            id: 5,
            entidad: 'Cambios Chaco',
            datos: (CambiosChaco.state === "fulfilled") ? CambiosChaco.value : []
        });

        retorno.push({
            id: 6,
            entidad: 'Banco Familiar',
            datos: (Familiar.state === "fulfilled") ? Familiar.value : []
        });

        retorno.push({
            id: 7,
            entidad: 'Interfisa Banco',
            datos: (Interfisa.state === "fulfilled") ? Interfisa.value : []
        });

        retorno.push({
            id: 8,
            entidad: 'Maxicambios',
            datos: (MaxiCambios.state === "fulfilled") ? MaxiCambios.value : []
        });

        res.json(retorno);
        res.end();

    }).done();

}); // get /todos

router.get('/quien', Generico.getGenerico);

module.exports = router;
