/*global config, isBuildForProd*/
'use strict';
var gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files'),
    gulp_flatten = require('gulp-flatten'),
    gulp_filter = require('gulp-filter');

gulp.task('i18n', ['i18n-app', 'i18n-bower-modules']);

gulp.task('i18n-app', function (done) {
  if (isBuildForProd()) {
    return gulp.src(config.i18n.src(), {base: config.paths.src})
      .pipe(gulp.dest(config.output()));
  } else {
    done();
  }
});

gulp.task('i18n-bower-modules', function () {
  if (isBuildForProd()) {
    return gulp.src(mainBowerFiles())
      .pipe(gulp_filter('**/*labels*.json'))
      .pipe(gulp_flatten())
      .pipe(gulp.dest(config.output() + '/i18n/'));
  }
});
