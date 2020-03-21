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