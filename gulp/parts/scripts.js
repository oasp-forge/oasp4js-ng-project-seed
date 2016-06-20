/*global config, isBuildForProd */
'use strict';
var gulp = require('gulp'),
    gulp_ngAnnotate = require('gulp-ng-annotate'),
    gulp_uglify = require('gulp-uglify'),
    gulp_file = require('gulp-file'),
    gulp_callback = require('gulp-callback'),
    Builder = require('systemjs-builder');

gulp.task('scripts', ['ngTemplates'], function (done) {
  if (isBuildForProd()) {
    var builder = new Builder('./', './system.config.js');
    //output.source;    // generated bundle source
    //output.sourceMap; // generated bundle source map
    //output.modules;   // array of module names defined in the bundle
    builder.buildStatic('app/app.module.ts').then(function (output) {
      gulp_file('app/app.module.js', output.source)
        .pipe(gulp_ngAnnotate())
        .pipe(gulp_uglify())
        .pipe(gulp.dest(config.paths.tmp))
        .pipe(gulp_callback(done));
    }, function (ex) {
      done(new Error(ex));
    });
  }
  else {
    done();
  }
});
