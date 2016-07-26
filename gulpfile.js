'use strict';

var gulp = require('gulp');
var fs = require('fs');

global.bowerConfig = JSON.parse(fs.readFileSync('./.bowerrc', 'utf8'));

global.isBuildForProd = function () {
  return process.env.NODE_ENV === 'prod';
};

global.config = require('./gulp/lib/config-factory.js')(require('./config.json'));

global.gulpsync = require('gulp-sync')(gulp);

require('./gulp/build.js');
require('./gulp/coverage.js');
require('./gulp/proxy.js');
require('./gulp/server.js');
require('./gulp/unit-tests.js');
require('./gulp/watch.js');

require('./gulp/parts/fonts.js');
require('./gulp/parts/html.js');
require('./gulp/parts/i18n.js');
require('./gulp/parts/img.js');
require('./gulp/parts/index-html.js');
require('./gulp/parts/ng-templates.js');
require('./gulp/parts/scripts.js');
require('./gulp/parts/styles.js');

gulp.task('default', ['clean'], function () {
  gulp.start('build:dist');
});
