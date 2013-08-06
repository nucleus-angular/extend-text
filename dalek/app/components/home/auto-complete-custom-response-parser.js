angular.module('demo.home.autoCompleteCustomResponseParser', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.autoCompleteCustomResponseParser', {
      url: '/auto-complete-custom-response-parser',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-custom-response-parser.html',
          controller: 'AutoCompleteCustomResponseParserCtrl'
        }
      }
    });
  }
])
.controller('AutoCompleteCustomResponseParserCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/users',
        responseParser: function(response) {
          var parsedData, x;
          parsedData = [];

          for(x = 0; x < response.users.length; x += 1) {
            parsedData.push({
              display: response.users[x].username,
              value: response.users[x].id
            });
          }

          return parsedData;
        }
      }
    };
  }
]);
