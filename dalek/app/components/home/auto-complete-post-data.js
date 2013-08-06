angular.module('demo.home.autoCompletePostData', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.autoCompletePostData', {
      url: '/auto-complete-post-data',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-post-data.html',
          controller: 'AutoCompletePostDataCtrl'
        }
      }
    });
  }
])
.controller('AutoCompletePostDataCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test',
        remoteDataMethod: 'POST'
      }
    };
  }
]);
