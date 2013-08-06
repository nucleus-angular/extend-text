angular.module('demo.home.autoCompleteCustomVariableFormat', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.autoCompleteCustomVariableFormat', {
      url: '/auto-complete-custom-variable-format',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-custom-variable-format.html',
          controller: 'AutoCompleteCustomVariableFormatCtrl'
        }
      }
    });
  }
])
.controller('AutoCompleteCustomVariableFormatCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test',
        formatVariable: function(value) {
          return value + '%';
        }
      }
    };
  }
]);
