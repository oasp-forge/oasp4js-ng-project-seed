/*global config*/
'use strict';
var gulp = require('gulp'),
    gulp_size = require('gulp-size'),
    gulp_plumber = require('gulp-plumber'),
    gulp_concat = require('gulp-concat'),
    gulp_less = require('gulp-less');

gulp.task('styles',['img:sprite'] ,function () {
    return gulp.src(config.styles.src())
        .pipe(gulp_concat(config.styles.output()))
        .pipe(gulp_less({
            paths: config.styles.includePaths()
        }))
        .pipe(gulp_plumber())
        .pipe(gulp.dest(config.paths.tmp))
        .pipe(gulp_size());
});

gulp.task('style:copy', function () {
    return gulp.src(config.styles.allSrc(), {base: config.paths.src})
        .pipe(gulp.dest(config.output()))
        .pipe(gulp_size());
});
