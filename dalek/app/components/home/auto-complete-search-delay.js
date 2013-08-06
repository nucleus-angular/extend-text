angular.module('demo.home.autoCompleteSearchDelay', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.autoCompleteSearchDelay', {
      url: '/auto-complete-search-delay',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-search-delay.html',
          controller: 'AutoCompleteSearchDelayCtrl'
        }
      }
    });
  }
])
.controller('AutoCompleteSearchDelayCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/search-delay'
      }
    };
  }
]);
