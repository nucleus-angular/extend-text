angular.module('demo.home.selectOnFocus', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.selectOnFocus', {
      url: '/select-on-focus',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/select-on-focus.html',
          controller: 'SelectOnFocusCtrl'
        }
      }
    });
  }
])
.controller('SelectOnFocusCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      selectOnFocus: true
    };
  }
]);
