'use strict';

var htmlMin = require('gulp-htmlmin'),
  angularTemplatecache = require('gulp-angular-templatecache'),
  processHtml = require('gulp-processhtml');

module.exports = function(gulp, config) {

  return function () {

    return gulp.src(config.ngTemplates.src())

      .pipe(processHtml({
        commentMarker: 'process',
        recursive: true,
        includeBase: config.paths.src
      }))

      .pipe(htmlMin({
        collapseWhitespace: true
      }))

      .pipe(angularTemplatecache({
        module: config.ngTemplates.targetModule(),
        filename: config.ngTemplates.target(),
        transformUrl: function (url) {
          return url.replace(/\.tpl\.html$/, '.html');
        }
      }))

      .pipe(gulp.dest(config.paths.tmp));
  }
};
