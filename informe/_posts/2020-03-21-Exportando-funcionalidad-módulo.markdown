---
layout: post
title:  "Exportando funcionalidad en un módulo"
date:   2020-03-21 17:56:00 +0000
categories: jekyll update
---
## Exportando funcionalidad en un módulo

```Javascript
const EventEmitter = require ('events').EventEmitter;
class LDJClient extends EventEmitter {
  constructor(stream){
    super();
    let buffer = '';
    stream.on('data', data => {
        buffer += data;
        let boundary = buffer.indexOf('\n');
        while(boundary !== -1) {
          const input = buffer.substring(0, boundary);
          buffer = buffer.substring(boundary + 1);
                this.emit('message', JSON.parse(input)); 
          boundary = buffer.indexOf('\n');
          }
        });
  }
  static connect(stream) {
    return new LDJClient(stream);
  }
}
/* Exporta la clase LDJClient*/
module.exports = LDJClient;

```

Dentro de la definición de clase, después del constructor, estamos agregando un método estático llamado `connect`.

El código para usar el módulo sería algo como esto

![libreria](/capturas/captura_export1.png)

O podríamos usar el método `connect`.

![lib-connect](/capturas/captura_export2.png)
