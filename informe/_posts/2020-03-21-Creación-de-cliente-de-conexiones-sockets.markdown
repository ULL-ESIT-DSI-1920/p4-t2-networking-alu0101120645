---
layout: post
title:  "Creación de cliente de conexiones sockets"
date:   2020-03-21 17:48:00 +0000
categories: jekyll update
---
## Creación de cliente de conexiones sockets.

```Javascript
'use strict'

const net = require('net');
const client = net.connect({port: 60300});

/*Conectamos por el puerto indicado y en caso de recibir datos los procesamos*/
client.on('data', data => {
  const message = JSON.parse(data);
  if(message.type === 'watching') {
    console.log(`Now watching: ${message.file}`);
  } else if (message.type === 'changed') {
    const date = new Date(message.timestamp);
    console.log(`File changed: ${date}`);
  } else {
    console.log(`Unrecognized message type: ${message.type}`);
  }
});
```

Este programa es un pequeño cliente que utiliza `net.connect` para crear una conexión cliente en el puerto especificado del localhost. Cuando llega algún dato es analizado y se muestra adecuadamente por consola, hasta ahra no hemos tenido en cuenta el manejo de errores.


