angular.module('demo.home.autoCompleteSelectOnBlur', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.autoCompleteSelectOnBlur', {
      url: '/auto-complete-select-on-blur',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-select-on-blur.html',
          controller: 'AutoCompleteSelectOnBlurCtrl'
        }
      }
    });
  }
])
.controller('AutoCompleteSelectOnBlurCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/select-on-blur',
        selectOnBlur: true
      }
    };
  }
]);
