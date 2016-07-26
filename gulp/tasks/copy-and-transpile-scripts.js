'use strict';

var ts = require('gulp-typescript'),
  sourceMaps = require('gulp-sourcemaps'),
  currentTsTranspiler = require('typescript');

module.exports = function(gulp, config) {

  return function (sourcePath, destPath, shouldTranspile, sourceMapsOptions) {

    return function () {

      var tsProject = ts.createProject({
          noExternalResolve: false,
          sortOutput: true,
          typescript: currentTsTranspiler
        }),

        result;

      sourceMapsOptions = sourceMapsOptions || {includeContent: true};

      result = gulp.src(sourcePath, {base: 'app'});

      // do the transpilation in case typescript is used
      if (shouldTranspile) {
        result = result
          .pipe(sourceMaps.init())
          .pipe(ts(tsProject)).js
          .pipe(sourceMaps.write(sourceMapsOptions));
      }

      // copy js sources
      return result.pipe(gulp.dest(destPath));
    }
  }
};
