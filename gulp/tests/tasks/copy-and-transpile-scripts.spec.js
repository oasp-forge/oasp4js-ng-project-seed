'use strict';

var gulp = require("gulp"),
  config = require('./../../lib/config-factory.js')(require('./../../../config.json')),
  assert = require('yeoman-assert'),
  recursiveReadDir = require('recursive-readdir-sync'),
  _ = require('lodash'),
  path = require('path'),

  /* GULP TASKS */
  copyAndTranspileScripts = require("./../../tasks/copy-and-transpile-scripts")(gulp, config),
  clean = require("./../../tasks/clean")(gulp, config);

describe("test:tasks:copyAndTranspileScripts", function () {

  var APP_PATH = 'app',
    TEMP_PATH = '.tmp',
    DEST_PATH = '.tmp/app',
    SOURCE_MAPS_CONTENT = "sourceMappingURL=";

  function getExpectedScriptsList(transpiled) {
    var ext = transpiled ? ".ts" : ".js",
      scriptsList;

    scriptsList = _.chain(recursiveReadDir(APP_PATH))

      .filter(function (file) {
        return _.endsWith(file, ext) && !_.endsWith(file, ".spec" + ext);
      })

      .map(function (file) {
        var tempScript = file;

        if (transpiled) {
          tempScript = _.replace(file, ext, ".js");
        }

        return path.join(TEMP_PATH, tempScript);
      })

      .value();

    return scriptsList || [];
  }

  function getExpectedContent(scripts) {
    return _.map(scripts, function (script) {
      return [script, SOURCE_MAPS_CONTENT];
    });
  }

  beforeEach(function (done) {
    clean().then(function () {
      done();
    });
  });

  describe("with transpilation", function () {

    var transpiled, expectedScripts, expectedContent, stream;

    beforeEach(function () {
      // given
      transpiled = true;
      expectedScripts = getExpectedScriptsList(transpiled);
      expectedContent = getExpectedContent(expectedScripts);

      // when
      stream = copyAndTranspileScripts(config.scripts.src(), DEST_PATH, transpiled)();
    });

    it("should copy scripts", function (done) {

      stream.on("end", function () {

        // then
        assert.file(expectedScripts);

        done();
      });
    });

    it("should generate source maps", function (done) {

      stream.on("end", function () {

        // then
        assert.fileContent(expectedContent);

        done();
      });
    });

  });

  describe("without transpilation", function () {

    var transpiled, expectedScripts, expectedContent, stream;

    beforeEach(function () {
      // given
      transpiled = false;
      expectedScripts = getExpectedScriptsList(transpiled);
      expectedContent = getExpectedContent(expectedScripts);

      // when
      stream = copyAndTranspileScripts(config.scripts.src(), DEST_PATH, transpiled)();
    });

    it("should copy scripts", function (done) {

      stream.on("end", function () {

        // then
        assert.file(expectedScripts);

        done();
      });
    });

    it("should not generate source maps", function (done) {

      stream.on("end", function () {

        // then
        assert.noFileContent(expectedContent);

        done();
      });
    });

  });

});
