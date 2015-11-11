# node-cotizaciones

Es un api desarrollada en NODE.JS para consumir las web de casas de cambio,
hacer el parser correspondiente y convertir eso a JSON para la API REST.

Por el momento tenemos de 3 casas de cambio, vamos a ir incluyendo mas.

En breve publicamos la api para que pueda ser consumida libremente.

Esperamos sea de utilidad para muchos, cualquier ayuda que quieran dar,

Son BIENVENIDOS !

## Rutas

- GET: /maxicambios
- GET: /cambioschaco
- GET: /cambiosalberdi
- GET: /todos

## Dependencias

- CORS
- Express
- Request
- Cheerio

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
