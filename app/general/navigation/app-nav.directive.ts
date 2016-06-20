export default function appNavDirective() {
  return {
    restrict: 'E',
    templateUrl: 'general/navigation/app-nav.html',
    scope: {},
    link: function ($scope:any) {
      $scope.navCollapsed = true;

      $scope.toggleNavigation = function () {
        $scope.navCollapsed = !$scope.navCollapsed;
      };
    }
  };
}
