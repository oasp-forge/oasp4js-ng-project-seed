/*global config*/
'use strict';

var gulp = require('gulp'),
    gulp_tslint = require('gulp-tslint'),
    Server = require('karma').Server,

    copyAndTranspileScripts = require('./tasks/copy-and-transpile-scripts')(gulp, config);

gulp.task('copyAndTranspileForTests', ['ngTemplates'], copyAndTranspileScripts(config.scripts.all(), ".tmp/app", true));

gulp.task('test', ['lint', 'copyAndTranspileForTests'], function (done) {
  process.env.generateCoverage = false;
  new Server({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: true,
    autoWatch: false
  }, done).start();
});

gulp.task('test:coverage', ['lint', 'testAndRemapJsCoverageToTs']);

gulp.task('test:tdd', ['copyAndTranspileForTests'], function (done) {
  process.env.generateCoverage = false;

  gulp.watch(config.scripts.all(), function (vinyl) {
    copyAndTranspileScripts(vinyl.path, "./.tmp/app", true)();
  });

  new Server({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: false,
    autoWatch: true
  }, done).start();
});

gulp.task('test:tdd:debug', ['copyAndTranspileForTests'], function (done) {
  process.env.generateCoverage = false;

  gulp.watch(config.scripts.all(), function (vinyl) {
    copyAndTranspileScripts(vinyl.path, "./.tmp/app", true)();
  });

  new Server({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: false,
    autoWatch: true,
    browsers: [
      'Chrome'
    ]
  }, done).start();
});

gulp.task('lint', function () {
  return gulp.src(config.scripts.lintSrc())
    .pipe(gulp_tslint({configuration: require('../tslint.json')}))
    .pipe(gulp_tslint.report('prose', {
      emitError: true
    }));
});
