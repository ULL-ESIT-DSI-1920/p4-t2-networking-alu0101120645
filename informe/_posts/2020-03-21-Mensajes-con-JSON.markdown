---
layout: post
title:  "Serialización de mensajes con JSON"
date:   2020-03-21 17:44:00 +0000
categories: jekyll update
---
## Serialización de mensajes con JSON.

Cada mensaje será un objeto serializado JSON.  Basicamente es un hash clave - valor.

`{“key: “value”, “anotherKey”: “anotherValue”}`

El servicio `net-watcher` que hemos creado envía dos tipos de mensajes que necesitamos convertir a  JSON:

* Cuando la conexión se establece por primera vez.
* Cuando el fichero se modifica.

Podemos codificar el primer tipo de la siguiente manera: 

`{“type”: “watching”, “file”: “target.txt”}`

Y el segundo de la siguiente:

`{“type”: “changed”, “timestamp”: 1358175733785}`
El campo `timestamp` contiene un valor entero que representa el número de milisegundos desde la medianoche del 1 de enero de 1970. Podemos obtener la fecha actual con `Date.now`.

Destacar que no usamos saltos de linea en nuestro mensaje JSON. Utilizamos en este caso los saltos de linea para separar los mensajes. Esto sería JSON delimitado por lineas (LDJ).

