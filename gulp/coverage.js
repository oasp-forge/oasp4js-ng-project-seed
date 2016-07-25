/*global config */
'use strict';
var
  gulp = require('gulp'),
  currentTsTranspiler = require('typescript'),
  ts = require('gulp-typescript'),
  gulp_copy = require('gulp-copy'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  Server = require('karma').Server,
  remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul'),

  tsProject = ts.createProject({
    declaration: false,
    noExternalResolve: false,
    sortOutput: true,
    typescript: currentTsTranspiler
  }),

  COVERAGE_SRC_PATH = config.paths.testOutput + '/coverage/';


gulp.task('clean:coverage', function (done) {
  return del(COVERAGE_SRC_PATH, done);
});

// copying TypeScript sources is needed for (remap-istanbul) report generation
gulp.task('copySourcesForCoverage', gulpsync.sync(['clean:coverage', 'ngTemplates']), function () {
  gulp.src(config.paths.src + '/**/*.ts', {base: 'app'})
    .pipe(gulp_copy(COVERAGE_SRC_PATH));
});

gulp.task('copyTemplatesForCoverage', ['copySourcesForCoverage'], function () {
  gulp.src(config.paths.tmp + '/app/**/*.templates.js')
    .pipe(gulp_copy(COVERAGE_SRC_PATH, {prefix: 1}));
});

gulp.task('transpileForCoverage', ['copyTemplatesForCoverage'], function () {
  var result = gulp.src(config.scripts.all(), {base: 'app'});

  // do the transpilation in case typescript is used
  result = result
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject)).js
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: ''}));

  // copy js sources
  return result.pipe(gulp.dest(COVERAGE_SRC_PATH + 'app'));
});

gulp.task('test:jsCoverage', ['transpileForCoverage'], function (done) {
  process.env.generateCoverage = true;
  new Server({
    configFile: __dirname + '/../karma.conf.coverage.js'
  }, done).start();
});

gulp.task('testAndRemapJsCoverageToTs', ['test:jsCoverage'], function () {
  gulp.src(COVERAGE_SRC_PATH + 'report.json')
    .pipe(remapIstanbul({
      basePath: 'app',
      reports: {
        lcovonly: COVERAGE_SRC_PATH + 'lcov.info',
        cobertura: COVERAGE_SRC_PATH + 'coverage.xml',
        html: COVERAGE_SRC_PATH + "html"
      }
    }));
});
