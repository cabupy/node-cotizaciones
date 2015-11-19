# node-cotizaciones
> **Que es ?** :neckbeard:
  - Es una api desarrollada en **NODE.JS** para consumir las web de casas de cambio y entidades financieras, luego hacer el parser correspondiente y convertir eso a JSON para la API REST.
  - Por el momento tenemos de 3 casas de cambio y 5 bancos, vamos a ir incluyendo mas.
  - Esperamos sea de utilidad para muchos, cualquier ayuda que quieran dar .. Sean **BIENVENIDOS** !

## Rutas http para probar, Donde ?

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

## Para clonar el repo

```sh
$ git clone https://github.com/cabupy/node-cotizaciones.git
$ cd node-cotizaciones/
```

## Instalar dependencias
Que estan especificadas en el [package.json]

```sh
$ npm install
```

## Dependencias
- cheerio
- cors
- cron
- express
- mongoose
- q
- request

## Y finalmente corremos el server con node

```sh
$ node server
```

## ToDo
- [x] Agregar una BD MongoDB para almacenar un historico.
- [x] Desarrollar una interfaz Web
- [ ] Desarrollar una App Hibrida (Ionic Framwork)

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
[package.json]: https://github.com/cabupy/node-cotizaciones/blob/master/package.json
