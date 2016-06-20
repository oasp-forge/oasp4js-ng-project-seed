/*global config, isBuildForProd*/
'use strict';
var gulp = require('gulp'),
    gulp_newer = require('gulp-newer'),
    gulp_if = require('gulp-if'),
    gulp_htmlmin = require('gulp-htmlmin'),
    gulp_size = require('gulp-size'),
    gulp_processhtml = require('gulp-processhtml');

gulp.task('html', function () {
    return gulp.src(config.html.src(), {base: config.paths.src})
        .pipe(gulp_newer(config.paths.tmp))
        .pipe(gulp_processhtml({
            commentMarker: 'process',
            recursive: true,
            includeBase: config.paths.src
        }))
        .pipe(gulp_if(isBuildForProd(), gulp_htmlmin({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest(config.output()))
        .pipe(gulp_size());
});
