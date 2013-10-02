angular.module('demo.home.autoCompleteLoadOptionsAttributeValue', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.autoCompleteLoadOptionsAttributeValue', {
      url: '/auto-complete-load-options-attribute-value',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-load-options-attribute-value.html',
          controller: 'AutoCompleteLoadOptionsAttributeValueCtrl'
        }
      }
    });
  }
])
.controller('AutoCompleteLoadOptionsAttributeValueCtrl', [
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
