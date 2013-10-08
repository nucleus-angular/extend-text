angular.module('demo.home.home', [
  'demo.core'
])
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('demo.home.home', {
      url: '/home?allowSubmitOnEnter',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    });
  }
])
.controller('HomeCtrl', [
  '$scope',
  function($scope) {
    $scope.emptyOptions = {};
    $scope.selectOnFocusOptions = {
      selectOnFocus: true
    };
    $scope.allowSubmitOnEnterOptions = {
      preventSubmitOnEnter: false
    };
    $scope.setDataOptions = {
      data: [{
        display: "Configuration",
        value: 'config'
      }]
    };
    $scope.taggingOptions = {
      tagOptions: {
        enabled: true
      }
    };
    $scope.autoCompleteOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
    $scope.autoCompleteCharacterCountOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
    $scope.autoCompleteDisplayValueOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
    $scope.autoCompleteAttributeValueOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
    $scope.autoCompleteNoFreeFormTextOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
    $scope.autoCompleteCustomResponseParserOptions = {
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
    $scope.autoCompleteCustomVariableNameOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test',
        variable: 'var'
      }
    };
    $scope.autoCompleteCustomVariableFormatOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test',
        formatVariable: function(value) {
          return value + '%';
        }
      }
    };
    $scope.autoCompleteSelectFirstOptionOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
    $scope.autoCompleteSelectOnBlurOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/select-on-blur',
        selectOnBlur: true
      }
    };
    $scope.autoCompleteAllowFreeFormTextOptions = {
      autoCompleteOptions: {
        enabled: true,
        allowFreeForm: true
      }
    };
  }
]);
