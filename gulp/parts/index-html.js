/*global config, isBuildForProd, gulpsync*/
'use strict';
var gulp = require('gulp'),
    gulp_if = require('gulp-if'),
    gulp_size = require('gulp-size'),
    gulp_rev = require('gulp-rev'),
    gulp_cleanCss = require('gulp-clean-css'),
    gulp_usemin = require('gulp-usemin'),
    gulp_processhtml = require('gulp-processhtml');

gulp.task('indexHtml', gulpsync.sync([
  ['styles', 'scripts', 'img:sprite', 'ngTemplates'],
  'indexHtml:html'
]));

//only build index.html without dependencies
gulp.task('indexHtml:html', function () {
  return gulp.src(config.indexHtml.src())
    .pipe(gulp_processhtml({
      commentMarker: 'process',
      recursive: true,
      environment: isBuildForProd() ? 'prod' : 'dev',
      includeBase: config.paths.src
    }))
    .pipe(gulp_if(isBuildForProd(), gulp_usemin({
      path: '{' + config.paths.tmp + ',' + config.paths.src + '}',
      css: [gulp_cleanCss({ compatibility: 'ie8' }), gulp_rev()],
      js: [gulp_rev()]
    })))
    .pipe(gulp.dest(config.output()))
    .pipe(gulp_size());
});
