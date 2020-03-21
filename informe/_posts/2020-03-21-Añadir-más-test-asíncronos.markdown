---
layout: post
title:  "Añadir más test asíncronos."
date:   2020-03-21 18:02:00 +0000
categories: jekyll update
---
## Añadir más test asíncronos.

Modificamos el `describe` de la siguiente manera

```Javascript
'use strict'

const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

/** Método en el que se realiza un test unitario que envia un mensaje*/
describe('LDJClient', () => {
  let stream = null;
  let client = null;

  beforeEach(() => {
    stream = new EventEmitter();
    client = new LDJClient(stream);
  });
  
  it('should emit a message event from a single data event', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });

    stream.emit('data', '{"foo": "bar"}\n');
    process.nextTick(() => stream.emit('data','"bar}\n"'));
  });
});

```

Esta prueba divide el mensaje en dos partes para ser emitidas por el `stream` uno después del otro.

Si se quiere especificar un tiempo para un test puede usar el `timeout`

![timeout](/capturas/captura_time.png)
