'use strict';

var assert = require('yeoman-assert'),
  exec = require('child_process').exec,
  path = require('path');

describe('test:int:build', function () {

  var TEST_PATH = ".test_int",
    TEMP_PATH = ".tmp";

  beforeEach(function (done) {
    exec('sh ./test/test-int.sh', function (error) {
      if (error) {
        console.log(error);
      }

      done();
    });
  });

  beforeEach(function (done) {
    exec('cd ' + TEST_PATH + ' & gulp build', function (error) {
      if (error) {
        console.log(error);
      }

      done();
    });
  });

  it('should install dependencies', function () {

    assert.file([
      path.join(TEST_PATH, 'bower_components'),
      path.join(TEST_PATH, 'node_modules'),
      path.join(TEST_PATH, 'typings')
    ]);
  });

  it('should build app', function () {

    assert.file([
      path.join(TEST_PATH, TEMP_PATH, 'index.html'),
      path.join(TEST_PATH, TEMP_PATH, 'app/app.module.js'),
      path.join(TEST_PATH, TEMP_PATH, 'app/app.templates.js'),
      path.join(TEST_PATH, TEMP_PATH, 'css/app.css')
    ]);
  });

});
