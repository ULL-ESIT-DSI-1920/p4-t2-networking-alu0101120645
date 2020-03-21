---
layout: post
title:  "Eventos de datos de almacenamiento en buffer."
date:   2020-03-21 17:54:00 +0000
categories: jekyll update
---
## Eventos de datos de almacenamiento en buffer.
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
}
```
