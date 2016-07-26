/*global config, isBuildForProd */
'use strict';
var gulp = require('gulp'),
  gulp_ngAnnotate = require('gulp-ng-annotate'),
  gulp_uglify = require('gulp-uglify'),
  Builder = require('systemjs-builder'),

  copyAndTranspileScripts = require('./../tasks/copy-and-transpile-scripts')(gulp, config);

gulp.task('copyAndTranspileScripts', ['ngTemplates'], copyAndTranspileScripts(config.scripts.src(), '.tmp/app', true, {includeContent: false, sourceRoot: '/app'}));

gulp.task('scripts', ['copyAndTranspileScripts'], function (done) {

  if (isBuildForProd()) {
    var systemBuilder = new Builder('./', './system.config.js');

    // bundle scripts
    systemBuilder.buildStatic('.tmp/app/app.module.js', '.tmp/app/app.module.js')
      .then(function () {
        gulp.src('.tmp/app/app.module.js', {base: './'})
          .pipe(gulp_ngAnnotate())
          .pipe(gulp_uglify())
          .pipe(gulp.dest('.'));

        done();
      })
      .catch(function (err) {
        done(new Error(err));
      });
  } else {
    done();
  }
});
