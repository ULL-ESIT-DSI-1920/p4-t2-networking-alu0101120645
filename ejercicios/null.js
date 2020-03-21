it('should emit a mesage event from two or more data event', done=>{
    clientInformation.onLine('message', message =>{
        assert.deepEqual(message, {foo: 'bar'});
        done();
    });
    stream.emit('data','{"foo": "bar"');
    stream.emit('data','}\n');

});