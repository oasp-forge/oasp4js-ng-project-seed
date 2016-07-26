/*global config*/
'use strict';
var gulp = require('gulp'),
    gulpEnv = require('gulp-env'),
    del = require('del');

var gulpsync = require('gulp-sync')(gulp);


/** ======================================== build ======================================== **/

gulp.task('env:develop', function () {
  gulpEnv({
    vars: {
      NODE_ENV: 'dev'
    }
  });
});

gulp.task('env:prod', function () {
  gulpEnv({
    vars: {
      NODE_ENV: 'prod'
    }
  });
});
gulp.task('build:develop', ['env:develop', 'build']);

gulp.task('build:ci', gulpsync.sync(['test', 'build:dist']));

gulp.task('build:dist', ['env:prod', 'build']);

gulp.task('build', ['indexHtml', 'scripts', 'styles', 'img', 'fonts', 'i18n', 'html']);

gulp.task('clean', require('./tasks/clean')(gulp, config));
