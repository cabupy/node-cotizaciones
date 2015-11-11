# node-cotizaciones

Es un api desarrollada en NODE.JS para consumir las web de casas de cambio,
hacer el parser correspondiente y convertir eso a JSON para la API REST.

Por el momento tenemos de 3 casas de cambio y 2 bancos, vamos a ir incluyendo mas.

Esperamos sea de utilidad para muchos, cualquier ayuda que quieran dar,

Son BIENVENIDOS !

## Rutas

- GET: /bancoatlas
- GET: /cambiosalberdi
- GET: /cambioschaco
- GET: /interfisa
- GET: /maxicambios
- GET: /todos

## Donde ?

- http://cotizaciones.cabu.co/bancoatlas
- http://cotizaciones.cabu.co/cambiosalberdi
- http://cotizaciones.cabu.co/cambioschaco
- http://cotizaciones.cabu.co/interfisa
- http://cotizaciones.cabu.co/maxicambios
- http://cotizaciones.cabu.co/todos

## Dependencias

- cheerio
- cors
- express
- q
- request

## Instalar dependencias

Especificadas en package.json

```console
npm install
```
## Pendientes

- Agregar una BD MongoDB o PostgreSQL para almacenar un historico.
- Incluir una interfaz Web y una App Hibrida (Ionic Framwork)

## Licencia

MIT
