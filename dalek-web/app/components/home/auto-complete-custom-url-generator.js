angular.module('demo.home.autoCompleteCustomUrlGenerator', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home.autoCompleteCustomUrlGenerator', {
      url: '/auto-complete-custom-url-generator',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-custom-url-generator.html',
          controller: 'AutoCompleteCustomUrlGeneratorCtrl'
        }
      }
    });
  }
])
.controller('AutoCompleteCustomUrlGeneratorCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/urlgen',
        generateDataUrl: function() {
          var url = this.options.autoCompleteOptions.url + '/t';
          var variableValue = this.getTextAreaValue();
          this.options.autoCompleteOptions.variableCache = this.getTextAreaValue();
          url += (url.indexOf('?') === -1 ? '?' : '&');
          url += this.options.autoCompleteOptions.variable + '=' + this.options.autoCompleteOptions.formatVariable(variableValue);

          if(this.options.autoCompleteOptions.remoteDataMethod === 'JSONP') {
            url += '&callback=JSON_CALLBACK';
          }

          return url;
        }
      }
    };
  }
]);
