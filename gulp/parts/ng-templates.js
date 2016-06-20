/*global config*/
'use strict';
var gulp = require('gulp'),
    gulp_htmlmin = require('gulp-htmlmin'),
    gulp_angularTemplateCache = require('gulp-angular-templatecache'),
    gulp_processhtml = require('gulp-processhtml');

gulp.task('ngTemplates', function () {
    return gulp.src(config.ngTemplates.src())
        .pipe(gulp_processhtml({
            commentMarker: 'process',
            recursive: true,
            includeBase: config.paths.src
        }))
        .pipe(gulp_htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp_angularTemplateCache({
            module: config.ngTemplates.targetModule(),
            filename: config.ngTemplates.target(),
            transformUrl: function (url) {
                return url.replace(/\.tpl\.html$/, '.html');
            }
        }))
        .pipe(gulp.dest(config.paths.tmp));
});
