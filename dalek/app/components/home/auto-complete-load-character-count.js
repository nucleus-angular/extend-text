angular.module('demo.home.autoCompleteLoadCharacterCount', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.autoCompleteLoadCharacterCount', {
      url: '/auto-complete-load-character-count',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-load-character-count.html',
          controller: 'AutoCompleteLoadCharacterCountCtrl'
        }
      }
    });
  }
])
.controller('AutoCompleteLoadCharacterCountCtrl', [
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
