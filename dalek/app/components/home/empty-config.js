angular.module('demo.home.emptyConfig', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.emptyConfig', {
      url: '/empty-config',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/empty-config.html',
          controller: 'EmptyConfigCtrl'
        }
      }
    });
  }
])
.controller('EmptyConfigCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {};
  }
]);
