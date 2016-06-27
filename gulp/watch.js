/*global config*/
'use strict';

var gulp = require('gulp'),
    gulp_sync = require('gulp-sync')(gulp);

gulp.task('watch', [], function () {
    gulp.watch(config.styles.allSrc(), ['styles']);
    gulp.watch(config.indexHtml.src(), ['indexHtml:html']);
    gulp.watch(config.html.src(), ['html']);
    gulp.watch(config.scripts.src(), ['scripts']);
    gulp.watch(config.ngTemplates.src(), ['ngTemplates']);
});
