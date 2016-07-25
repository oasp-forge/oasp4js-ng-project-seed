System.config({
  baseURL: '/',
  defaultJSExtensions: true,
  transpiler: null,
  paths: {
    'npm:*': 'node_modules/*',
    'tmp/*': './.tmp/*',
    'bower:*': 'bower_components/*'
  },

  meta: {
    'bower:angular-mocks/angular-mocks.js': {
      format: 'global'
    }
  },

  map: {
    'templates': 'tmp/app/app.templates.js',
    'angular': 'bower:angular/index.js',
    'angular-mocks': 'bower:angular-mocks/angular-mocks.js',
    'angular-ui-router': 'bower:angular-ui-router/release/angular-ui-router.js'
  }
});
