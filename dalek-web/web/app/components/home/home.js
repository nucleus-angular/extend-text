angular.module('demo.home.home', [
  'demo.core'
])
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('demo.home.empty', {
      url: '/empty',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/empty.html',
          controller: 'EmptyCtrl'
        }
      }
    })
    .state('demo.home.selectOnFocus', {
      url: '/select-on-focus',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/select-on-focus.html',
          controller: 'SelectOnFocusCtrl'
        }
      }
    })
    .state('demo.home.allowSubmitOnEnter', {
      url: '/allow-submit-on-enter?allowSubmitOnEnter',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/allow-submit-on-enter.html',
          controller: 'AllowSubmitOnEnterCtrl'
        }
      }
    })
    .state('demo.home.setData', {
      url: '/set-data',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/set-data.html',
          controller: 'SetDataCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteBasic', {
      url: '/auto-complete-basic',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-basic.html',
          controller: 'AutoCompleteBasicCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteNumberValue', {
      url: '/auto-complete-number-value',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-number-value.html',
          controller: 'AutoCompleteNumberValueCtrl'
        }
      }
    })
    .state('demo.home.autoCompletStringValue', {
      url: '/auto-complete-string-value',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-string-value.html',
          controller: 'AutoCompleteStringValueCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteCharacterCount', {
      url: '/auto-complete-character-count',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-character-count.html',
          controller: 'AutoCompleteCharacterCountCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteDisplayValue', {
      url: '/auto-complete-display-value',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-display-value.html',
          controller: 'AutoCompleteDisplayValueCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteAttributeValue', {
      url: '/auto-complete-attribute-value',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-attribute-value.html',
          controller: 'AutoCompleteAttributeValueCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteNoFreeFormText', {
      url: '/auto-complete-no-free-form-text',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-no-free-form-text.html',
          controller: 'AutoCompleteNoFreeFormTextCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteCustomResponseParser', {
      url: '/auto-complete-custom-response-parser',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-custom-response-parser.html',
          controller: 'AutoCompleteCustomResponseParserCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteCustomVariableName', {
      url: '/auto-complete-custom-variable-name',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-custom-variable-name.html',
          controller: 'AutoCompleteCustomVariableNameCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteCustomVariableFormat', {
      url: '/auto-complete-custom-variable-format',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-custom-variable-format.html',
          controller: 'AutoCompleteCustomVariableFormatCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteSelectFirstOption', {
      url: '/auto-complete-select-first-option',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-select-first-option.html',
          controller: 'AutoCompleteSelectFirstOptionCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteSelectOnBlur', {
      url: '/auto-complete-select-on-blur',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-select-on-blur.html',
          controller: 'AutoCompleteSelectOnBlurCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteAllowFreeFormText', {
      url: '/auto-complete-allow-free-form-text',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-allow-free-form-text.html',
          controller: 'AutoCompleteAllowFreeFormTextCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteAllowFreeFormTextInOptions', {
      url: '/auto-complete-allow-free-form-text-in-options',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-allow-free-form-text-in-options.html',
          controller: 'AutoCompleteAllowFreeFormTextInOptionsCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteLocalData', {
      url: '/auto-complete-local-data',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-local-data.html',
          controller: 'AutoCompleteLocalDataCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteLocalDataCustomFilter', {
      url: '/auto-complete-local-data-custom-filter',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-local-data-custom-filter.html',
          controller: 'AutoCompleteLocalDataCustomFilterCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteLocalDataAllowFreeFormText', {
      url: '/auto-complete-local-data-allow-free-form-text',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-local-data-allow-free-form-text.html',
          controller: 'AutoCompleteLocalDataAllowFreeFormTextCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteDelay', {
      url: '/auto-complete-delay',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-delay.html',
          controller: 'AutoCompleteDelayCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteCustomDataUrlGenerator', {
      url: '/auto-complete-custom-data-url-generator',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-custom-data-url-generator.html',
          controller: 'AutoCompleteCustomDataUrlGeneratorCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteResetForm', {
      url: '/auto-complete-reset-form',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-reset-form.html',
          controller: 'AutoCompleteResetFormCtrl'
        }
      }
    })
    .state('demo.home.taggingBasic', {
      url: '/tagging-basic',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/tagging-basic.html',
          controller: 'TaggingBasicCtrl'
        }
      }
    })
    .state('demo.home.taggingAllowDuplicates', {
      url: '/tagging-allow-duplicates',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/tagging-allow-duplicates.html',
          controller: 'TaggingAllowDuplicatesCtrl'
        }
      }
    })
    .state('demo.home.taggingDoubleClickEdit', {
      url: '/tagging-double-click-edit',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/tagging-double-click-edit.html',
          controller: 'TaggingDoubleClickEditCtrl'
        }
      }
    })
    .state('demo.home.autoFocus', {
      url: '/auto-focus',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-focus.html',
          controller: 'AutoFocusCtrl'
        }
      }
    });
  }
])
.controller('EmptyCtrl', [
  '$scope',
  function($scope) {
    $scope.emptyOptions = {};
  }
])
.controller('SelectOnFocusCtrl', [
  '$scope',
  function($scope) {
    $scope.selectOnFocusOptions = {
      selectOnFocus: true
    };
  }
])
.controller('AllowSubmitOnEnterCtrl', [
  '$scope',
  function($scope) {
    $scope.allowSubmitOnEnterOptions = {
      preventSubmitOnEnter: false
    };
  }
])
.controller('SetDataCtrl', [
  '$scope',
  function($scope) {
    $scope.setDataOptions = {
      data: [{
        display: "Configuration",
        value: 'config'
      }]
    };
  }
])
.controller('AutoCompleteBasicCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
  }
])
.controller('AutoCompleteNumberValueCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteNumberValueOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/number-value'
      }
    };
  }
])
.controller('AutoCompleteStringValueCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteStringValueOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/string-value'
      }
    };
  }
])
.controller('AutoCompleteCharacterCountCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteCharacterCountOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
  }
])
.controller('AutoCompleteDisplayValueCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteDisplayValueOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
  }
])
.controller('AutoCompleteAttributeValueCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteAttributeValueOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
  }
])
.controller('AutoCompleteNoFreeFormTextCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteNoFreeFormTextOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
  }
])
.controller('AutoCompleteCustomResponseParserCtrl', [
  '$scope',
  function($scope) {
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
  }
])
.controller('AutoCompleteCustomVariableNameCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteCustomVariableNameOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test',
        variable: 'var'
      }
    };
  }
])
.controller('AutoCompleteCustomVariableFormatCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteCustomVariableFormatOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test',
        formatVariable: function(value) {
          return value + '%';
        }
      }
    };
  }
])
.controller('AutoCompleteSelectFirstOptionCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteSelectFirstOptionOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
  }
])
.controller('AutoCompleteSelectOnBlurCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteSelectOnBlurOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/select-on-blur',
        selectOnBlur: true
      }
    };
  }
])
.controller('AutoCompleteAllowFreeFormTextCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteAllowFreeFormTextOptions = {
      autoCompleteOptions: {
        enabled: true,
        allowFreeForm: true,
        url: '/api/freeform'
      }
    };
  }
])
.controller('AutoCompleteAllowFreeFormTextInOptionsCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteAllowFreeFormTextInOptionsOptions = {
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
        }],
        freeFormIndicator: 'option'
      }
    };
  }
])
.controller('AutoCompleteLocalDataCtrl', [
  '$scope',
  function($scope) {
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
  }
])
.controller('AutoCompleteLocalDataCustomFilterCtrl', [
  '$scope',
  function($scope) {
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
  }
])
.controller('AutoCompleteLocalDataAllowFreeFormTextCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteLocalDataAllowFreeFormTextOptions = {
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
  }
])
.controller('AutoCompleteDelayCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteDelayOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/delay',
        searchDelay: 1000
      }
    };
  }
])
.controller('AutoCompleteCustomDataUrlGeneratorCtrl', [
  '$scope',
  function($scope) {
    $scope.autoCompleteCustomDataUrlGeneratorOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/delay',
        generateDataUrl: function() {
          return '/api/custom-url?customUrl=' + this.getTextAreaValue();
        }
      }
    };
  }
])
.controller('AutoCompleteResetFormCtrl', [
  '$scope',
  '$rootScope',
  '$timeout',
  function($scope, $rootScope, $timeout) {
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
])
.controller('TaggingBasicCtrl', [
  '$scope',
  function($scope) {
    $scope.taggingBasicOptions = {
      tagOptions: {
        enabled: true
      }
    };
  }
])
.controller('TaggingAllowDuplicatesCtrl', [
  '$scope',
  function($scope) {
    $scope.taggingAllowDuplicatesOptions = {
      tagOptions: {
        enabled: true,
        allowDuplicates: true
      }
    };
  }
])
.controller('TaggingDoubleClickEditCtrl', [
  '$scope',
  function($scope) {
    $scope.taggingDoubleClickEditOptions = {
      tagOptions: {
        enabled: true,
        doubleClickEdit: true
      }
    };
  }
])
.controller('AutoFocusCtrl', [
  '$scope',
  function($scope) {
    $scope.emptyOptions = {};
  }
]);