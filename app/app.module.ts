/// <reference path="../typings/globals/angular/index.d.ts" />
import * as angular from 'angular';
import 'angular-ui-router';

import generalModuleName from './general/general.module';
import bookMgmtModuleName from './book-mgmt/book-mgmt.module';
import 'tmp/app/app.templates.js';

angular.module('app', [bookMgmtModuleName, generalModuleName])
  .config(function ($urlRouterProvider:ng.ui.IUrlRouterProvider, $locationProvider:ng.ILocationProvider) {
    $urlRouterProvider.when('', '/book-mgmt/books');
    $locationProvider.html5Mode(false);
  });
