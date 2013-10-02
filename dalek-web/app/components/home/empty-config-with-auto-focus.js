angular.module('demo.home.emptyConfigWithAutoFocus', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.emptyConfigWithAutoFocus', {
      url: '/empty-config-with-auto-focus',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/empty-config-with-auto-focus.html',
          controller: 'EmptyConfigWithAutoFocusCtrl'
        }
      }
    });
  }
])
.controller('EmptyConfigWithAutoFocusCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {};
  }
]);
