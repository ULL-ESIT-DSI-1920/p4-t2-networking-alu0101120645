---
layout: post
title:  "Importando un módulo Node.js"
date:   2020-03-21 17:58:00 +0000
categories: jekyll update
---
## Importando un módulo Node.js

```Javascript
'use strict';

/*Empleamos la clase LDJClient que hemos creado para conectarnos*/
const netClient = require('net').connect({port: 60300});
const ldjClient = require('./lib/ldj-client.js').connect(netClient);

/*Escuchamos si recibimos un mensaje y lo procesamos**/
ldjClient.on('message', message => {
  if(message.type === 'watching') {
    console.log(`Now watching: ${message.file}`);
  } else if (message.type === 'changed') {
    console.log(`File changed: ${new Date(message.timestamp)}`);
  } else {
    throw Error(`Unrecognized message type: ${message.type}`);
  }
});
```

La principal diferencia respecto a lo anterior es que, en lugar de enviar buffers de datos directamente a JSON.parse , este programa se basa en el módulo ldj-client para producir eventos de mensajes .

Ejecutamos el servidor de pruebas y el nuevo cliente.

![prueba](/capturas/captura_import.png)
