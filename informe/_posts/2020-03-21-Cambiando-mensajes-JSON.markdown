---
layout: post
title:  "Cambiando a mensajes JSON"
date:   2020-03-21 17:46:00 +0000
categories: jekyll update
---
## Cambiando a mensajes JSON.

A continuación modificamos el servicio `net-watcher` para emplear el protocolo que hemos definido.

Nuestra tarea es usar `JSON.stringify` para codificar objectos de mensaje y enviarlos mediante `connection.write`. Con `JSON.stringify` lo que hacemos es coger un objeto JavaScript y devolver un string en forma de JSON.

Lo que haremos es modificar el `connection.write`.
```Javascript
'use strict'

const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

/* Comprobamos que se introdujo nombre de fichero*/
if(!filename) {
  throw Error('Error: No filename specified.');
}

/*Establecemos la conexion y escuchamos por el puerto indicado*/
net.createServer( connection => {
  //Reporting.
  console.log('Subscriber connected.');
  connection.write(JSON.stringify({type: 'watching', file: filename}) + '\n');

  //watcher setup.
  const watcher = fs.watch(filename, () => connection.write(
    JSON.stringify({type: 'changed', timestamp: Date.now()}) + '\n'));

  //Cleanup.
  connection.on('close', () => {
    console.log('Subscriber disconnected.');
    watcher.close();
  });
}).listen(60300, () => console.log('Listening for subscribers...'))

```

Ahora ejecutamos el nuevo archivo guardado como `net-watcher-json-service.js`

![server-json](/capturas/captura_cambio.png)
