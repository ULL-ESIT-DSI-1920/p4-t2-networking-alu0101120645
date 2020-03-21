---
layout: post
title:  "Implementando un servicio de pruebas."
date:   2020-03-21 17:52:00 +0000
categories: jekyll update
---
## Implementando un servicio de pruebas.

Implementaremos un servicio de pruebas que divide a propósito un mensaje en múltiples partes.

```Javascript
'use strict';

const server = require('net').createServer(connection => {
  console.log('Subscriber connected.');

  //Two message chunks that together make a whole message.
  const firstChunk = '{"type": "changed", "timesta';
  const secondChunk = 'mp": 1450694370094}\n';

  //Send the first chunk inmeditely.
  connection.write(firstChunk);

  //After a short delay, send the other chunk.
  const timer = setTimeout(() => {
    connection.write(secondChunk);
    connection.end();
  }, 100);

  //Clear timer when the connection ends.
  connection.on('end', () => {
    clearTimeout(timer);
    console.log('Subscriber disconnected.');
  });
});

server.listen(60300, function() {
  console.log('Test server listening for subscribers...');
});
```

Una vez guardado ejecutamos y comprobamos el error de que solo recibe en primer lugar un fragmento del mensaje. Como ya comentamos lo que hace es parsear el mensaje que le llega y como solo coge lo primero que le llegó salta el error al estar incompleto.

![error-client](/capturas/captura_error_split.png)
