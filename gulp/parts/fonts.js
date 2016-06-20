/*global config, isBuildForProd*/
'use strict';
var gulp = require('gulp'),
    gulp_flatten = require('gulp-flatten');

gulp.task('fonts', function (done) {
    //TODO check font awesome
    if (isBuildForProd()) {
        return gulp.src('bower_components/**/*.{eot,svg,ttf,woff,woff2}')
            .pipe(gulp_flatten())
            .pipe(gulp.dest(config.output() + '/fonts/'));
    } else {
        done();
    }
});
