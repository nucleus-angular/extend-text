angular.module('demo.home.setDataInConfig', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.setDataInConfig', {
      url: '/set-data-in-config',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/set-data-in-config.html',
          controller: 'SetDataInConfigCtrl'
        }
      }
    });
  }
])
.controller('SetDataInConfigCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      data: [{
        display: "Configuration",
        value: 'config'
      }]
    };
  }
]);
