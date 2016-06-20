# oasp4js-ng-project-seed
A seed for AngularJS 1.x projects. Supports JavaScript / ES2015 / TypeScript.

+ Prerequisites
    - install node.js v5.0.0
    - install bower: `npm install -g bower`
    - install gulp: `npm install -g gulp`
    - install typings: `npm install -g typings`
+ `npm install` installs project seed's tools, bower dependencies and TypeScript *.d.ts files
+ Enjoy:
    - `gulp serve` starts the BookApp for development
    - `gulp serve:dist` starts the BookApp for production (TypeScript files transpiled to JavaScript, obfuscated, minimized)
    - `gulp lint` executes TSLint check
    - `gulp test` executes specs (incl. TSLint check) against the PhantomJS (headless) browser
    - `gulp test:tdd` executes specs (against the PhantomJS browser) and watches for file changes (excellent for Test Driven Development)
    - `gulp test:tdd:debug` executes specs against the Chrome browser for easy debugging (it is watched for file changes too)
    - `gulp test:coverage` executes specs against the PhantomJS (headless) browser and generates test coverage reports in `test-output/coverage` (HTML, lcov, cobertura)
    
