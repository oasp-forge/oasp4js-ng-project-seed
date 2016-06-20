/*global config */
'use strict';
var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    gulp_copy = require('gulp-copy'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    Server = require('karma').Server,
    remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul'),

    tsProject = ts.createProject('tsconfig.json', {
        sortOutput: true
    }),
    COVERAGE_SRC_PATH = config.paths.coverageOutput  + '/';


gulp.task('clean:coverage', function (done) {
    return del(COVERAGE_SRC_PATH, done);
});


gulp.task('copyTemplatesForCoverage', ['clean:coverage', 'ngTemplates'], function () {
    gulp.src(config.paths.tmp + '/app/**/*.templates.js')
        .pipe(gulp_copy(COVERAGE_SRC_PATH, { prefix: 1 }));
});

gulp.task('compileForCoverage', ['copyTemplatesForCoverage'], function () {
    var tsResult = tsProject.src('app/**/*.ts')
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest(COVERAGE_SRC_PATH + 'app'));
});

gulp.task('test:coverage', ['compileForCoverage', 'ngTemplates'], function (done) {
    process.env.generateCoverage = true;
    new Server({
        configFile: __dirname + '/../karma.conf.coverage.js',
        singleRun: true,
        autoWatch: false
    }, done).start();
});


gulp.task('remapCoverage', ['test:coverage'], function () {
    gulp.src(COVERAGE_SRC_PATH + 'report.json')
        .pipe(remapIstanbul({
            basePath: 'app',
            reports: {
                lcovonly: COVERAGE_SRC_PATH + 'lcov.info',
                html: COVERAGE_SRC_PATH + 'html/report'
            }
        }));
});
