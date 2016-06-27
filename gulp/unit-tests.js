/*global config*/
'use strict';

var gulp = require('gulp'),
    gulp_tslint = require('gulp-tslint'),
    Server = require('karma').Server,

    currentTsTranspiler = require('typescript'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),

    tsProject = ts.createProject({
      noExternalResolve: false,
      sortOutput: true,
      typescript: currentTsTranspiler
    });

function copyAndTranspileSources(sourcePath) {
  var result = gulp.src(sourcePath, {base: 'app'});

  // do the transpilation in case typescript is used
  result = result
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject)).js
    .pipe(sourcemaps.write({includeContent: true}));

  // copy js sources
  return result.pipe(gulp.dest('./.tmp/app'));
}

gulp.task('copyAndTranspileForTests', ['ngTemplates'], function () {
  return copyAndTranspileSources(config.scripts.all());
});

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
    copyAndTranspileSources(vinyl.path);
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
    copyAndTranspileSources(vinyl.path);
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
