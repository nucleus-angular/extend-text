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
  '$rootScope',
  '$timeout',
  function($scope, $rootScope, $timeout) {
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
    $scope.autoCompleteNumberValueOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/number-value'
      }
    };
    $scope.autoCompleteStringValueOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/string-value'
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
        allowFreeForm: true,
        url: '/api/freeform'
      }
    };
    $scope.autoCompleteLocalDataOptions = {
      autoCompleteOptions: {
        enabled: true,
        source: 'local',
        localData: [{
          display: 'local 1',
          value: 'l1'
        }, {
          display: 'lcal 2',
          value: 'l2'
        }, {
          display: 'local 3',
          value: 'l3'
        }, {
          display: 'lcal 4',
          value: 'l4'
        }, {
          display: 'local 5',
          value: 'l5'
        }]
      }
    };
    $scope.autoCompleteLocalDataCustomFilterOptions = {
      autoCompleteOptions: {
        enabled: true,
        source: 'local',
        filter: function(data, filter) {
          return _.filter(data, function(item) {
            return filter === 'test' ? true : false;
          });
        },
        localData: [{
          display: 'local 1',
          value: 'l1'
        }, {
          display: 'lcal 2',
          value: 'l2'
        }, {
          display: 'local 3',
          value: 'l3'
        }, {
          display: 'lcal 4',
          value: 'l4'
        }, {
          display: 'local 5',
          value: 'l5'
        }]
      }
    };
    $scope.autoCompleteLocalDataAllowFreeFormOptions = {
      autoCompleteOptions: {
        enabled: true,
        source: 'local',
        allowFreeForm: true,
        localData: [{
          display: 'local 1',
          value: 'l1'
        }, {
          display: 'lcal 2',
          value: 'l2'
        }, {
          display: 'local 3',
          value: 'l3'
        }, {
          display: 'lcal 4',
          value: 'l4'
        }, {
          display: 'local 5',
          value: 'l5'
        }]
      }
    };
    $scope.autoCompleteDelayOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/delay',
        searchDelay: 1000
      }
    };
    $scope.autoCompleteCustomDataUrlGeneratorOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/delay',
        generateDataUrl: function() {
          return '/api/custom-url?customUrl=' + this.getTextAreaValue();
        }
      }
    };
    $scope.autoCompleteResetFirstNameOptions = {
      autoCompleteOptions: {
        enabled: true,
        source: 'local',
        localData: [{
          display: 'John',
          value: 'John'
        }, {
          display: 'Jane',
          value: 'Jane'
        }, {
          display: 'Tom',
          value: 'Tom'
        }]
      }
    };
    $scope.autoCompleteResetLastNameOptions = {
      autoCompleteOptions: {
        enabled: true,
        source: 'local',
        localData: [{
          display: 'Smith',
          value: 'Smith'
        }, {
          display: 'Doe',
          value: 'Doe'
        }, {
          display: 'Deer',
          value: 'Deer'
        }]
      }
    };
    $scope.extendTextResettableObject = {
      firstName: null,
      lastNAme: null
    };
    $scope.extendTextResettableDefaults = {
      firstName: null,
      lastNAme: null
    };
    $scope.resetExtendTextResettableForm = function() {
      $rootScope.$broadcast('NagForm[extendTextResettable]/reset', $scope.extendTextResettableDefaults);
    };

    //todo: figure out why it needs the delay and see if it is possible to resolved
    $timeout(function() {
      $rootScope.$broadcast('NagExtendText[autoCompleteResetFirstName]/setData', [{
        'display': 'John',
        'value': 'John'
      }]);
      $rootScope.$broadcast('NagExtendText[autoCompleteResetLastName]/setData', [{
        'display': 'Doe',
        'value': 'Doe'
      }]);
    }, 200);
  }
]);
