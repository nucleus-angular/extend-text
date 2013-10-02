angular.module('demo.home.tagging', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.tagging', {
      url: '/tagging',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/tagging.html',
          controller: 'TaggingCtrl'
        }
      }
    });
  }
])
.controller('TaggingCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      tagOptions: {
        enabled: true
      }
    };
  }
]);
