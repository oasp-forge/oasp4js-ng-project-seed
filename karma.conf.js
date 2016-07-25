// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-06-09 using
// generator-karma 0.8.2

'use strict';

module.exports = function (config) {

  //merge libraries configured by bower, application sources, and specs
  var pathsConf = require('./gulp/lib/config-factory.js')(require('./config.json'));

  var karmaDefaultConfig = {
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '.',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['systemjs', 'jasmine'],

    // list of files / patterns to load in the browser
    files: pathsConf.scripts.testSrc(),

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 7890,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-systemjs',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // coverage reporter generates the coverage
    reporters: ['progress'],

    systemjs: {
      // Path to your SystemJS configuration file
      configFile: 'system.config.js',

      // SystemJS configuration specifically for tests, added after your config file.
      // Good for adding test libraries and mock modules
      config: {
        paths: {
          'angular': 'bower:angular/angular.js',
          'tmp/*': '.tmp/*',
          'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.src.js',
          'systemjs': 'node_modules/systemjs/dist/system.src.js',
          'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.src.js',
          'phantomjs-polyfill': 'node_modules/phantomjs-polyfill/bind-polyfill.js'
        },
        meta: {
          'bower:angular/angular.js': {
            format: 'global'
          }
        }
      },

      // Patterns for files that you want Karma to make available, but not loaded until a module requests them. eg. Third-party libraries.
      serveFiles: ['bower_components/**/*', pathsConf.paths.tmp + '/**/*']
    }
  };
  config.set(karmaDefaultConfig);
};
