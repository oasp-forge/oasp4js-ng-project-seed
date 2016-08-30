'use strict';

var gulp = require("gulp"),
  config = require('./../../lib/config-factory.js')(require('./../../../config.json')),
  assert = require('yeoman-assert'),
  recursiveReadDir = require('recursive-readdir-sync'),
  _ = require('lodash'),
  path = require('path'),

  /* GULP TASKS */
  ngTemplates = require("./../../tasks/ng-templates")(gulp, config),
  clean = require("./../../tasks/clean")(gulp, config);

describe("test:tasks:ngTemplates", function () {

  var APP_PATH = "app",
    TEMPLATES_FILE_PATH = ".tmp/app/app.templates.js";

  function getExpectedContent() {
    var expectedContent;

    expectedContent = _.chain(recursiveReadDir(APP_PATH))

      .filter(function (file) {
        return _.endsWith(file, ".tpl.html");
      })

      .map(function (file) {
        return [TEMPLATES_FILE_PATH, path.basename(_.replace(file, ".tpl", ""))];
      })

      .value();

    return expectedContent || [];
  }

  beforeEach(function (done) {
    clean().then(function () {
      done();
    });
  });

  it("should generate templates file", function (done) {
    // given
    var stream,
      expectedContent = getExpectedContent();

    // when
    stream = ngTemplates();

    stream.on("end", function () {

      // then
      assert.file(TEMPLATES_FILE_PATH);
      assert.fileContent(expectedContent);

      done();
    });
  });

});
