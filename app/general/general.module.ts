import appNavDirective from './navigation/app-nav.directive';

let generalModule:ng.IModule = angular.module('general', [])
  .directive('appNav', appNavDirective);

export default generalModule.name;
