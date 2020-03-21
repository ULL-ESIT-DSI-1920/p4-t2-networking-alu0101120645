var gulp = require('gulp');
var shell = require('gulp-shell');
var child = require('child_process').exec;

gulp.task('default', function () {
  console.log('gulp!');
});

gulp.task("pre-install", shell.task([
  "npm i -g gulp static-server",
  "npm install -g nodemon",
  "npm install -g gulp-shell"
]));

gulp.task("doc", shell.task("jsdoc -r ."));
gulp.task("test", shell.task("npm test"));
gulp.task('test', function (done) {
	child('npm test', (stdout) => { console.log(`${stdout}`); });
	done();
});

gulp.task('json-service', function(done) {
	child('node net-watcher-json-service.js target.txt', (stdout) => { 
		console.log(`${stdout}`);
	});
	done();
});


gulp.task('json-client', function(done) {
	child('node net-watcher-json-client.js', (stdout) => { console.log(`${stdout}`); });
	done();
});

gulp.task('target', function(done) {
	child('touch target.txt', () => { console.log('Target.txt Creado\n'); });
	done();
});

gulp.task('no-target', function(done) {
	child('rm target.txt', (error) => { 
		if(error)
			console.log('Error eliminando el fichero\n');
		else
			console.log('Fichero eliminado');
	});
	done();
});