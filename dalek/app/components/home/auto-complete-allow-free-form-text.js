angular.module('demo.home.autoCompleteAllowFreeFormText', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.autoCompleteAllowFreeFormText', {
      url: '/auto-complete-allow-free-form-text',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-allow-free-form-text.html',
          controller: 'AutoCompleteAllowFreeFormTextCtrl'
        }
      }
    });
  }
])
.controller('AutoCompleteAllowFreeFormTextCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        allowFreeForm: true
      }
    };
  }
]);
