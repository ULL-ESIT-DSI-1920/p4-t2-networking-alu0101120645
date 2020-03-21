---
layout: post
title:  "Escuchando en Sockets Unix."
date:   2020-03-21 17:42:00 +0000
categories: jekyll update
---

## Escuchando en Sockets Unix.

Para ver como funciona `net` en los sockets Unix modificamos el programa anterior . 

Cambiamos el listen final por `listen(‘/tmp/watcher.sock’, () => console.log(‘Listening for subscribers...’));`.

Este archivo lo guardamos como `net-watcher-unix.js`.

`NOTA: si se recibe un error EADDRINUSE debe eliminar el watcher.sock antes de ejecutar el programa de nuevo.`

La ejecución será igual que la anterior pero al `nc` le añadiremos la opción `-U` seguido de `/tmp/watcher.sock`.

Los sockets Unix pueden ser más rápidos que los sockets TCP porque no requieren invocar al hardware de red. 

