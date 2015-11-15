/*
    Author: Ing. Carlos Vallejos
    Empresa: Vamyal S.A.
    Noviembre del 2015
*/

module.exports = {
    ip: 'localhost',
    port: 3050,
    optionsRequest: {
        rejectUnauthorized: false,
        headers: {
            "Content-Type": "application/json"
        },
        timeout: 5000
    },
    parseMaxiCambios: [{
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
    }, {
        moneda: "Euro",
        clase: '.lineas1',
        posicion: 2,
        compra: 7,
        venta: 5
    }, ],
    parseBancoAtlas: [{
        moneda: "Dolar",
        posicion: 0,
        compra: 6,
        venta: 10
    }, {
        moneda: "Peso Argentino",
        posicion: 3,
        compra: 6,
        venta: 10
    }, {
        moneda: "Real",
        posicion: 2,
        compra: 6,
        venta: 10
    },  {
        moneda: "Euro",
        posicion: 1,
        compra: 6,
        venta: 10
    }, ],
    parseBancoAmambay: [{
        moneda: "Dolar",
        posicion: 0
    }, {
        moneda: "Peso Argentino",
        posicion: 3
    }, {
        moneda: "Real",
        posicion: 2
    }, {
        moneda: "Euro",
        posicion: 4
    },],
    parseCambiosAlberdi: [{
        moneda: "Dolar",
        compra: 0,
        venta: 1
    }, {
        moneda: "Peso Argentino",
        compra: 2,
        venta: 3
    }, {
        moneda: "Real",
        compra: 4,
        venta: 5
    },  {
        moneda: "Euro",
        compra: 6,
        venta: 7
    }, ],
    parseCambiosChaco: [{
        moneda: "Dolar",
        compra: 8,
        venta: 9
    }, {
        moneda: "Peso Argentino",
        compra: 12,
        venta: 13
    }, {
        moneda: "Real",
        compra: 16,
        venta: 17
    }, {
        moneda: "Euro",
        compra: 20,
        venta: 21
    }, ],
    parseFamiliar: [{
        moneda: "Dolar",
        clase: 'div#wrapper-banner > div.wrapper > div.sidebar > div#content > div#slider > ul > li > span#dolar'
    }, {
        moneda: "Peso Argentino",
        clase: 'div#wrapper-banner > div.wrapper > div.sidebar > div#content > div#slider > ul > li > span#peso'
    }, {
        moneda: "Real",
        clase: 'div#wrapper-banner > div.wrapper > div.sidebar > div#content > div#slider > ul > li > span#real'
    },  {
        moneda: "Euro",
        clase: 'div#wrapper-banner > div.wrapper > div.sidebar > div#content > div#slider > ul > li > span#euro'
    }, ],
    parseInterfisa: [{
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
    },  {
        moneda: "Euro",
        compra: 'td#euro_compra',
        venta: 'td#euro_venta'
    }, ],
};
