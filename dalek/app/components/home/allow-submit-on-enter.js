angular.module('demo.home.allowSubmitOnEnter', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.allowSubmitOnEnter', {
      url: '/allow-submit-on-enter',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/allow-submit-on-enter.html',
          controller: 'AllowSubmitOnEnterCtrl'
        }
      }
    });
  }
])
.controller('AllowSubmitOnEnterCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      preventSubmitOnEnter: false
    };
  }
]);
