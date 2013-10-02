angular.module('demo.home.autoCompleteCustomVariableName', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.autoCompleteCustomVariableName', {
      url: '/auto-complete-custom-variable-name',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-custom-variable-name.html',
          controller: 'AutoCompleteCustomVariableNameCtrl'
        }
      }
    });
  }
])
.controller('AutoCompleteCustomVariableNameCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test',
        variable: 'var'
      }
    };
  }
]);
