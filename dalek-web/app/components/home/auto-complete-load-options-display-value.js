angular.module('demo.home.autoCompleteLoadOptionsDisplayValue', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.autoCompleteLoadOptionsDisplayValue', {
      url: '/auto-complete-load-options-display-value',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-load-options-display-value.html',
          controller: 'AutoCompleteLoadOptionsDisplayValueCtrl'
        }
      }
    });
  }
])
.controller('AutoCompleteLoadOptionsDisplayValueCtrl', [
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
