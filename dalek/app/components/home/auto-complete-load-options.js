angular.module('demo.home.autoCompleteLoadOptions', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.autoCompleteLoadOptions', {
      url: '/auto-complete-load-options',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-load-options.html',
          controller: 'AutoCompleteLoadOptionsCtrl'
        }
      }
    });
  }
])
.controller('AutoCompleteLoadOptionsCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
  }
]);
