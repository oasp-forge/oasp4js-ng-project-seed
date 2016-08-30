/*global config*/
'use strict';
var gulp = require('gulp');

gulp.task('ngTemplates', require('./../tasks/ng-templates')(gulp, config));
