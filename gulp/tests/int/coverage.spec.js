'use strict';

var assert = require('yeoman-assert'),
  exec = require('child_process').exec,
  path = require('path'),
  recursiveReadDir = require('recursive-readdir-sync'),
  _ = require('lodash');

describe('test:int:coverage', function () {

  var TEST_PATH = ".test_int",
    APP_PATH = "app",
    COVERAGE_PATH = "test-output/coverage";

  function getExpectedScriptsList() {
    var scriptsList;

    scriptsList = _.chain(recursiveReadDir(APP_PATH))

      .filter(function (file) {
        return _.endsWith(file, ".ts") || _.endsWith(file, ".js");
      })

      .map(function (file) {
        return path.join(TEST_PATH, COVERAGE_PATH, _.replace(file, ".ts", ".js"));
      })

      .value();

    return scriptsList || [];
  }

  beforeEach(function (done) {
    exec('sh ./test/test-int.sh', function (error) {
      if (error) {
        console.log(error);
      }

      done();
    });
  });

  beforeEach(function (done) {
    exec('cd ' + TEST_PATH + ' & gulp test:coverage', function (error) {
      if (error) {
        console.log(error);
      }

      done();
    });
  });

  it('should copy files', function () {

    assert.file(getExpectedScriptsList());
  });

  it('should generate coverage report files', function () {

    assert.file([
      path.join(TEST_PATH, COVERAGE_PATH, 'coverage.xml'),
      path.join(TEST_PATH, COVERAGE_PATH, 'lcov.info'),
      path.join(TEST_PATH, COVERAGE_PATH, 'report.json'),
      path.join(TEST_PATH, COVERAGE_PATH, 'html/index.html'),
      path.join(TEST_PATH, COVERAGE_PATH, 'html/base.css'),
      path.join(TEST_PATH, COVERAGE_PATH, 'html/prettify.css'),
      path.join(TEST_PATH, COVERAGE_PATH, 'html/prettify.js'),
      path.join(TEST_PATH, COVERAGE_PATH, 'html/sorter.js')
    ]);
  });

});
