'use strict';

/*global isBuildForProd*/
var moduleParser = require('./module-parser.js');
var builderFactory = require('./builder-factory.js');
var _ = require('lodash');

var configFactory = function (externalConfig) {
  var modulesConfig = moduleParser.parseModules(externalConfig.paths.src, externalConfig.libRegexp || '');
  var pathsBuilder = builderFactory(externalConfig.paths, modulesConfig.modules);
  var currentOutput = function () {
    return isBuildForProd() ? externalConfig.paths.dist : externalConfig.paths.tmp;
  };


  return {
    paths: externalConfig.paths,

    externalConfig: externalConfig,
    //outputs
    output: function () {
      return currentOutput();
    },
    testOutput: function () {
      return externalConfig.paths.testOutput;
    },
    outputs: function () {
      return [externalConfig.paths.dist, externalConfig.paths.tmp, externalConfig.paths.testOutput];
    },
    proxies: _.map(externalConfig.proxies, function (proxyConf) {
      return {
        url: function () {
          return proxyConf.baseUrl + proxyConf.context;
        },
        context: function () {
          return proxyConf.context;
        },
        servicesPath: function () {
          return proxyConf.servicesPath;
        },
        websocketPath: function () {
          return proxyConf.websocketPath;
        },
        id: function () {
          return proxyConf.id;
        }
      };
    }),
    //app items
    indexHtml: {
      src: function () {
        return [pathsBuilder.build('{src}/index.html')];
      }
    },

    i18n: {
      src: function () {
        return _.flatten([
          pathsBuilder.build('{src}/**/i18n/**/*.json')
        ]);
      }
    },
    html: {
      src: function () {
        return _.flatten([
          pathsBuilder.build('{src}/**/*.html'),
          pathsBuilder.build('!{src}/index.html'),
          pathsBuilder.build('!{src}/**/*.tpl.html')
        ]);
      }
    },

    scripts: {
      all: function () {
        return pathsBuilder.build('{src}/**/*.ts')
      },
      src: function () {
        return _.flatten([
          pathsBuilder.build('{src}/**/*.ts'),
          pathsBuilder.build('!{src}/**/*.spec.ts')
        ]);
      },
      testSrc: function () {
        return _.flatten([
          //load main spec to guarantee angular-mock loading
          pathsBuilder.build('{testSrc}/app.spec.js'),
          pathsBuilder.build('{testSrc}/*.module.js'),
          pathsBuilder.build('{testSrc}/*.mock.js'),
          pathsBuilder.build('{testSrc}/**/*.mock.js'),
          pathsBuilder.build('{testSrc}/*.spec.js'),
          pathsBuilder.build('{testSrc}/**/*.spec.js')
        ]);
      },
      lintSrc: function () {
        return _.flatten([
          pathsBuilder.build('{src}/*.module.ts'),
          pathsBuilder.build('{src}/**/*.ts')
        ]);
      }
    },
    ngTemplates: {
      src: function () {
        return pathsBuilder.build('{src}/**/*.tpl.html');
      },
      targetModule: function () {
        return 'ng';
      },
      target: function () {
        return pathsBuilder.build('app/app.templates.js');
      }
    },
    styles: {
      /** include only root files*/
      src: function () {
        return pathsBuilder.build('{src}/*.' + externalConfig.styles.type);
      },
      /** include all*/
      allSrc: function () {
        return pathsBuilder.build('{src}/**/*.' + externalConfig.styles.type);
      },
      output: function () {
        return externalConfig.styles.output;
      },
      includePaths: function () {
        return [
          externalConfig.paths.src,
          externalConfig.paths.tmp
        ];
      }
    },
    img: {
      src: function () {
        return [pathsBuilder.build('{src}/**/img/**/*.*'), pathsBuilder.build('!{src}/**/img/sprite/**/*.*')];
      },
      sprite: {
        src: function () {
          return pathsBuilder.build('{src}/**/img/sprite/**/*.png');
        },
        output: {
          css: function () {
            return 'css/sprite.css';
          },
          img: function () {
            return 'img/sprite.png';
          }
        }
      }
    }
  };
};
module.exports = configFactory;
