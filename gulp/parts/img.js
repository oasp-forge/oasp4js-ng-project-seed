/*global config, isBuildForProd*/
'use strict';
var gulp = require('gulp'),
    gulp_spritesmith = require('gulp.spritesmith'),
    gulp_imagemin = require('gulp-imagemin'),
    gulp_size = require('gulp-size');


gulp.task('img', ['img:sprite', 'img:copy']);

gulp.task('img:sprite', function () {
    return gulp.src(config.img.sprite.src())
        .pipe(gulp_spritesmith({
            imgName: config.img.sprite.output.img(),
            cssName: config.img.sprite.output.css()
        }))
        .pipe(gulp.dest(config.paths.tmp))
        .pipe(gulp_size());
});

gulp.task('img:sprite:copy', ['img:sprite'], function (done) {
    if (isBuildForProd()) {
        return gulp.src(config.paths.tmp + '/' + config.img.sprite.output.img(), {base: config.paths.tmp})
            .pipe(gulp_imagemin({
                optimizationLevel: 3,
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(config.output()))
            .pipe(gulp_size());
    } else {
        done();
    }
});

gulp.task('img:copy', ['img:sprite:copy'], function (done) {
    if (isBuildForProd()) {
        return gulp.src(config.img.src(), {base: config.paths.src})
            .pipe(gulp_imagemin({
                optimizationLevel: 3,
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(config.output()))
            .pipe(gulp_size());
    } else {
        done();
    }
});

