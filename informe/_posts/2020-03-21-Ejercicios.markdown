---
layout: post
title:  "Ejercicios."
date:   2020-03-21 18:04:00 +0000
categories: jekyll update
---
## Testability.

* Test que divide un mensaje en dos o más pedazos.

```Javascript

'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

describe('LDJClient', () => {
  let stream = null;
  let client = null;

    beforeEach(() => {
      stream = new EventEmitter();
      client = new LDJClient(stream);
    });
  it('should emit a message event from split data events', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo":"bar"}\n');
    process.nextTick(() => stream.emit('data', '"bar"}\n'));
  });
});
```

* Test que pasa un objecto nulo y detecta el error.

```Javascript

'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

describe('LDJClient', () => {
  let stream = null;
  let client = null;

    beforeEach(() => {
      stream = new EventEmitter();
      client = new LDJClient(stream);
    });
  it('Error creating an object with null parameter', done => {
      assert.throws( () => {new LDJClient(null);});
      done();
  });
});
```

## Robustness.

* En caso de que el formato JSON que se reciba no sea adecuado el servidor se cerrará y el cliente verá la notificación del error.

* Aquí tenemos un test para enviar y detectar el error de pasar un mensaje que no es JSON. 
```javascript
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

/** Test unitario que envia un mensaje no JSON*/
describe('LDJClient', () => {
  let stream = null;
  let client = null;

  beforeEach(() => {
    stream = new EventEmitter();
    client = new LDJClient(stream);
  });
  
  it('should throw a error message because its not a JSON text.', done =>   {  assert.throws( () => {
      stream.emit('data', 'Not JSON message\n');
    });
    done();
  });
});
```



* Si falta el último salto de linea lo que pasa es que se quedará esperando y nunca emitirá el mensaje. Para poder manejar esta situación implementamos un evento `close` que comprobará si existe o no un `\n` al final del JSON. En caso de no existir lanza el error o, en caso contrario, emite el mensaje.

```Javascript
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

/** Test unitario que envia un mensaje sin salto de linea seguido de un evento close*/
describe('LDJClient', () => {
  let stream = null;
  let client = null;

  beforeEach(() => {
    stream = new EventEmitter();
    client = new LDJClient(stream);
  });
  
  it('Without last new line and with close event', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });

    stream.emit('data', '{"foo": "bar"}\n');
    stream.emit('close');
  });
});
```

