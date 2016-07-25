/*global config, isBuildForProd */
'use strict';
var gulp = require('gulp'),
  gulp_ngAnnotate = require('gulp-ng-annotate'),
  gulp_uglify = require('gulp-uglify'),
  gulp_file = require('gulp-file'),
  gulp_callback = require('gulp-callback'),
  Builder = require('systemjs-builder'),

  currentTsTranspiler = require('typescript'),
  ts = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps'),

  tsProject = ts.createProject({
    noExternalResolve: false,
    sortOutput: true,
    typescript: currentTsTranspiler
  });

gulp.task('copyAndTranspileScripts', ['ngTemplates'], function (done) {
  var result = gulp.src(config.scripts.src(), {base: 'app'});

  // do the transpilation in case typescript is used
  result = result
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject)).js
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/app'}));

  // copy js sources
  return result.pipe(gulp.dest('./.tmp/app'));
});

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
