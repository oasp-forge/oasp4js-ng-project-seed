'use strict';

module.exports = (gulp, plugins) => () => {
  var tsProject = ts.createProject({
      noExternalResolve: false,
      sortOutput: true,
      typescript: plugins.currentTsTranspiler
    }),
    result = gulp.src(config.scripts.src(), {base: 'app'});

  // do the transpilation in case typescript is used
  result = result
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.ts(tsProject)).js
    .pipe(plugins.sourcemaps.write({includeContent: false, sourceRoot: '/app'}));

  // copy js sources
  return result.pipe(gulp.dest('./.tmp/app'));
};
