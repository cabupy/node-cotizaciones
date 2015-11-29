/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

var mongoose = require('mongoose');

var cotizacionesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    entidad: {
        type: String,
        required: true
    },
    moneda: {
        type: String,
        required: true
    },
    compra: {
        type: Number,
        required: true,
        default: 0
    },
    venta: {
        type: Number,
        required: true,
        default: 0
    },
    spread: {
        type: Number,
        required: true,
        default: 0
    },
    difcompra: {
        type: Number,
        required: true,
        default: 0
    },
    difventa: {
        type: Number,
        required: true,
        default: 0
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },
});

var Cotizaciones = module.exports = mongoose.model('Cotizaciones', cotizacionesSchema);
