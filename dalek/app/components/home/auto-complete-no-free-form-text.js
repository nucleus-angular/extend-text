angular.module('demo.home.autoCompleteNoFreeFormText', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.autoCompleteNoFreeFormText', {
      url: '/auto-complete-no-free-form-text',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-no-free-form-text.html',
          controller: 'AutoCompleteNoFreeFormTextCtrl'
        }
      }
    });
  }
])
.controller('AutoCompleteNoFreeFormTextCtrl', [
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
