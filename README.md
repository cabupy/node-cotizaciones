# node-cotizaciones
> **Notas:**
  - Es una api desarrollada en **NODE.JS** para consumir las web de casas de cambio y entidades financieras, luego hacer el parser correspondiente y convertir eso a JSON para la API REST.
  - Por el momento tenemos de 3 casas de cambio y 5 bancos, vamos a ir incluyendo mas.
  - Esperamos sea de utilidad para muchos, cualquier ayuda que quieran dar .. Sean **BIENVENIDOS** !

## Rutas http, Donde ?

Metodo | Ruta
------ | -----------------
GET    | [/bancoamambay]
GET    | [/bancoatlas]
GET    | [/bancobbva]
GET    | [/cambiosalberdi]
GET    | [/cambioschaco]
GET    | [/familiar]
GET    | [/interfisa]
GET    | [/maxicambios]
GET    | [/todos]

## Dependencias
- cheerio
- cors
- express
- q
- request

## Instalar dependencias
Especificadas en package.json

```sh
$ npm install
```

## Para correr el server

```sh
$ node server
```

## Pendientes
- Agregar una BD MongoDB o PostgreSQL para almacenar un historico.
- Incluir una interfaz Web y una App Hibrida (Ionic Framwork)

## Licencia
[MIT]

[/bancoamambay]: http://cotizaciones.cabu.co/bancoamambay
[/bancoatlas]: http://cotizaciones.cabu.co/bancoatlas
[/bancobbva]: http://cotizaciones.cabu.co/bancobbva
[/cambiosalberdi]: http://cotizaciones.cabu.co/cambiosalberdi
[/cambioschaco]: http://cotizaciones.cabu.co/cambioschaco
[/familiar]: http://cotizaciones.cabu.co/familiar
[/interfisa]: http://cotizaciones.cabu.co/interfisa
[/maxicambios]: http://cotizaciones.cabu.co/maxicambios
[/todos]: http://cotizaciones.cabu.co/todos
[mit]: https://github.com/cabupy/node-cotizaciones/blob/master/LICENSE
