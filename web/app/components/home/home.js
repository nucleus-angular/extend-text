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
      url: '/allow-submit-on-enter?allowSubmitOnEnterInput',
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
    .state('demo.home.autoCompleteFormValidation', {
      url: '/auto-complete-form-validation',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-form-validation.html',
          controller: 'AutoCompleteFormValidationCtrl'
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
    })
    .state('demo.home.autoFocusTextarea', {
      url: '/auto-focus-textarea',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-focus-textarea.html',
          controller: 'AutoFocusTextareaCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteCustomGetData', {
      url: '/auto-complete-custom-get-data',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-custom-get-data.html',
          controller: 'AutoCompleteCustomGetDataCtrl'
        }
      }
    })
    .state('demo.home.autoCompleteCustomSetValue', {
      url: '/auto-complete-custom-set-value',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-complete-custom-set-value.html',
          controller: 'AutoCompleteCustomSetValueCtrl'
        }
      }
    })
    .state('demo.home.noAutoHeight', {
      url: '/no-auto-height',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/no-auto-height.html',
          controller: 'noAutoHeightCtrl'
        }
      }
    })
    .state('demo.home.autoHeight', {
      url: '/auto-height',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/auto-height.html',
          controller: 'autoHeightCtrl'
        }
      }
    })
    .state('demo.home.parsingWithAutoComplete', {
      url: '/parsing-with-auto-complete',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/parsing-with-auto-complete.html',
          controller: 'parsingWithAutoCompleteCtrl'
        }
      }
    })
    .state('demo.home.parsingBasic', {
      url: '/parsing-basic',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/parsing-basic.html',
          controller: 'parsingBasicCtrl'
        }
      }
    });
  }
])
.controller('EmptyCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {};
    $scope.textareaOptions = {};
  }
])
.controller('SelectOnFocusCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      selectOnFocus: true
    };
    $scope.textareaOptions = {
      selectOnFocus: true
    };
  }
])
.controller('AllowSubmitOnEnterCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      preventSubmitOnEnter: false
    };
    $scope.textareaOptions = {
      preventSubmitOnEnter: false
    };
  }
])
.controller('SetDataCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      data: [{
        display: "Configuration",
        value: 'config'
      }]
    };
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/number-value'
      }
    };
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/string-value'
      }
    };
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
    $scope.textareaOptions = {
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
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test',
        variable: 'var'
      }
    };
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test',
        formatVariable: function(value) {
          return value + '%';
        }
      }
    };
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test'
      }
    };
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/select-on-blur',
        selectOnBlur: true
      }
    };
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        allowFreeForm: true,
        url: '/api/freeform'
      }
    };
    $scope.textareaOptions = {
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
    $scope.options = {
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
    $scope.textareaOptions = {
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
    $scope.options = {
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
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        source: 'local',
        filter: function(data, filter) {
          return _.filter(data, function(item) {
            return filter === 'test';
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
    $scope.textareaOptions = {
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
    $scope.options = {
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
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/delay',
        searchDelay: 1000
      }
    };
    $scope.textareaOptions = {
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
    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/delay',
        generateDataUrl: function() {
          return '/api/custom-url?customUrl=' + this.$scope.getTextAreaValue();
        }
      }
    };
    $scope.textareaOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/delay',
        generateDataUrl: function() {
          return '/api/custom-url?customUrl=' + this.$scope.getTextAreaValue();
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
    $scope.firstNameOptions = {
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

    $scope.lastNameOptions = {
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
      lastName: null
    };

    $scope.extendTextResettableDefaults = {
      firstName: null,
      lastName: null
    };

    $scope.resetExtendTextResettableForm = function() {
      $rootScope.$broadcast('NagForm[extendTextResettable]/reset', $scope.extendTextResettableDefaults);
    };

    //todo: figure out why it needs the delay and see if it is possible to resolved
    $timeout(function() {
      $rootScope.$broadcast('NagExtendText[input]/setData', [{
        'display': 'John',
        'value': 'John'
      }]);
      $rootScope.$broadcast('NagExtendText[textarea]/setData', [{
        'display': 'Doe',
        'value': 'Doe'
      }]);
    }, 200);
  }
])
.controller('AutoCompleteFormValidationCtrl', [
  '$scope',
  '$rootScope',
  '$timeout',
  function($scope, $rootScope, $timeout) {
    $scope.firstNameOptions = {
      autoCompleteOptions: {
        enabled: true,
        source: 'local',
        localData: [{
          display: 'John',
          value: 'John'
        }, {
          display: 'JohnJohnJohn',
          value: 'JohnJohnJohn'
        }, {
          display: 'Jane',
          value: 'Jane'
        }, {
          display: 'Tom',
          value: 'Tom'
        }]
      }
    };

    $scope.lastNameOptions = {
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

    $scope.middleNameOptions = {
      autoCompleteOptions: {
        enabled: true,
        source: 'local',
        allowFreeForm: true,
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

    $scope.forthNameOptions = {
      autoCompleteOptions: {
        enabled: true,
        source: 'local',
        allowFreeForm: true,
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

    $scope.firstNameTextareaOptions = {
      autoCompleteOptions: {
        enabled: true,
        source: 'local',
        localData: [{
          display: 'John',
          value: 'John'
        }, {
          display: 'JohnJohnJohn',
          value: 'JohnJohnJohn'
        }, {
          display: 'Jane',
          value: 'Jane'
        }, {
          display: 'Tom',
          value: 'Tom'
        }]
      }
    };

    $scope.lastNameTextareaOptions = {
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

    $scope.middleNameTextareaOptions = {
      autoCompleteOptions: {
        enabled: true,
        source: 'local',
        allowFreeForm: true,
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

    $scope.forthNameTextareaOptions = {
      autoCompleteOptions: {
        enabled: true,
        source: 'local',
        allowFreeForm: true,
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
      lastName: null,
      middleName: null,
      forthName: null,
      firstNameTextarea: null,
      lastNameTextarea: null,
      middleNameTextarea: null,
      forthNameTextarea: null
    };

    $scope.extendTextResettableDefaults = {
      firstName: null,
      lastName: null,
      middleName: null,
      forthName: null,
      firstNameTextarea: null,
      lastNameTextarea: null,
      middleNameTextarea: null,
      forthNameTextarea: null
    };

    $scope.resetExtendTextResettableForm = function() {
      $rootScope.$broadcast('NagForm[extendTextResettable]/reset', $scope.extendTextResettableDefaults);
    };

    //todo: figure out why it needs the delay and see if it is possible to resolved
    $timeout(function() {
      $rootScope.$broadcast('NagExtendText[lastName]/setData', [{
        'display': 'Doe',
        'value': 'Doe'
      }]);
    }, 200);
    $timeout(function() {
      $rootScope.$broadcast('NagExtendText[forthName]/setData', [{
        'display': 'Doe',
        'value': 'Doe'
      }]);
    }, 200);
    $timeout(function() {
      $rootScope.$broadcast('NagExtendText[lastNameTextarea]/setData', [{
        'display': 'Doe',
        'value': 'Doe'
      }]);
    }, 200);
    $timeout(function() {
      $rootScope.$broadcast('NagExtendText[forthNameTextarea]/setData', [{
        'display': 'Doe',
        'value': 'Doe'
      }]);
    }, 200);
  }
])
.controller('TaggingBasicCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      tagOptions: {
        enabled: true
      }
    };
    $scope.textareaOptions = {
      tagOptions: {
        enabled: true
      }
    };
  }
])
.controller('TaggingAllowDuplicatesCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      tagOptions: {
        enabled: true,
        allowDuplicates: true
      }
    };
    $scope.textareaOptions = {
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
    $scope.options = {
      tagOptions: {
        enabled: true,
        doubleClickEdit: true
      }
    };
    $scope.textareaOptions = {
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
    $scope.options = {};
    $scope.textareaOptions = {};
  }
])
.controller('AutoFocusTextareaCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {};
    $scope.textareaOptions = {};
  }
])
.controller('AutoCompleteCustomGetDataCtrl', [
  '$scope',
  function($scope) {
    var getData = function() {
      this.controller.processData(this.controller.filter([
        {
          display: 'getdata 1',
          value: 1
        },
        {
          display: 'getdata 2',
          value: 2
        }
      ]));
    };

    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test',
        searchDelay: 0,
        getData: getData
      }
    };
    $scope.textareaOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test',
        searchDelay: 0,
        getData: getData
      }
    };
  }
])
.controller('AutoCompleteCustomSetValueCtrl', [
  '$scope',
  function($scope) {
    var setValue = function(newDisplay, newValue) {
      var currentTextAreaValue = this.$scope.getTextAreaValue();
      newDisplay = currentTextAreaValue.replace('s', newDisplay);
      newValue += '-value';

      return {
        display: newDisplay,
        value: newValue
      };
    };

    $scope.options = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test',
        searchDelay: 0,
        setValue: setValue
      }
    };
    $scope.textareaOptions = {
      autoCompleteOptions: {
        enabled: true,
        url: '/api/test',
        searchDelay: 0,
        setValue: setValue
      }
    };
  }
])
.controller('noAutoHeightCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      autoHeight: false
    };
  }
])
.controller('autoHeightCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {};
  }
])
.controller('parsingBasicCtrl', [
  '$scope',
  function($scope) {
    $scope.options = {
      parsingOptions: {
        enabled: true,
        parser: new SearchQuery()
      }
    };
  }
])
.controller('parsingWithAutoCompleteCtrl', [
  '$scope',
  '$http',
  function($scope, $http) {
    $scope.options = {
      parsingOptions: {
        enabled: true,
        parser: new SearchQuery()
      },
      autoCompleteOptions: {
        enabled: true,
        allowFreeForm: true,
        url: '/api/test',
        searchDelay: 0,
        loadCharacterCount: 0,
        freeFormIndicator: false,
        generateDataUrl: function() {
          var variableValue = this.$scope.getTextAreaValueFromCursor();
          var url = this.$scope.options.autoCompleteOptions.url;
          var lastIdentifier = this.$scope.options.parsingOptions.parser.getLastTokenByType(variableValue, 'identifier');
          lastIdentifier = (_.isObject(lastIdentifier)) ? lastIdentifier.value : this.$scope.options.autoCompleteOptions.variable;
          var lastValue = this.$scope.options.parsingOptions.parser.getPreviousTokenByIndex(variableValue, 0);

          //we should only be filtering if the we have found an unknown or value token as the last token
          lastValue = (_.isObject(lastValue) && ['unknown', 'value'].indexOf(lastValue.type) !== -1) ? lastValue.value : '';

          //need to account for comparison to take multiple value
          if(_.isArray(lastValue)) {
            lastValue = lastValue[lastValue.length - 1];

            //null/undefined means we are expecting another value so we need to get the full list again
            if(lastValue === null || lastValue === undefined) {
              lastValue = '';
            }
          }

          if(_.isString(lastValue)) {
            lastValue = lastValue.trim();
          }

          this.$scope.options.autoCompleteOptions.variableCache = this.$scope.getTextAreaValue();
          url += (url.indexOf('?') === -1 ? '?' : '&');
          url += lastIdentifier + '=' + lastValue;

          if(this.$scope.options.autoCompleteOptions.remoteDataMethod === 'JSONP') {
            url += '&callback=JSON_CALLBACK';
          }
          return url;
        },
        setValue: function(newDisplay, newValue, isAutoCompleteSelection) {
          //only want to do this logic when selecting an auto complete option
          var data = {};

          if(isAutoCompleteSelection) {
            var cursorPosition;
            var fullValue = this.$scope.getTextAreaValue();
            var cursorBasedValue = this.$scope.getTextAreaValueFromCursor();
            var cursorTokenList = this.$scope.options.parsingOptions.parser.getTokenList(cursorBasedValue);
            var fullTokenList = this.$scope.options.parsingOptions.parser.getTokenList(fullValue);
            var usedTokens = cursorTokenList;
            var usedTokenIndex = cursorTokenList.length - 1;
            var replaceStart, replaceEnd;

            if(cursorBasedValue.substr(cursorBasedValue.length - 1, 1) === ' ') {
              usedTokenIndex += 1;
            }

            if(fullTokenList[usedTokenIndex]) {
              usedTokens = fullTokenList;
            }

            if((usedTokens.length > 0 && cursorBasedValue.substr(cursorBasedValue.length - 1, 1) !== ' ') || (usedTokens.length > 1 && usedTokens[usedTokenIndex])) {
              //need to account for account for comparisons that have multiple values
              var usedValue = usedTokens[usedTokenIndex].value;

              if(_.isArray(usedValue)) {
                var arrayValueIndex = cursorTokenList[usedTokenIndex].value.length > 0 ? cursorTokenList[usedTokenIndex].value.length - 1 : 0;
                usedValue = usedValue[arrayValueIndex];

                if(usedValue === null || usedValue === undefined) {
                  usedValue = '';
                }
              }

              replaceStart = fullValue.lastIndexOf(usedValue);
              replaceEnd = replaceStart + usedValue.length;

              if(usedTokens.length >= (usedTokenIndex + 2)) {
                if(usedTokens[usedTokenIndex + 1].value === null || usedTokens[usedTokenIndex + 1].value === true) {
                  replaceEnd += 5;
                } else if(usedTokens[usedTokenIndex + 1].value === false) {
                  replaceEnd += 6;
                }
              }
            } else if(cursorBasedValue.substr(cursorBasedValue.length - 1, 1) === ' ') {
              replaceStart = cursorBasedValue.length;
              replaceEnd = replaceStart;
            }

            cursorPosition = newDisplay.length;

            newDisplay = fullValue.substr(0, replaceStart) + newDisplay + fullValue.substr(replaceEnd);

            if(_.isNumber(replaceStart)) {
              cursorPosition += parseInt(replaceStart);
            }

            data.cursorPosition = {
              start: cursorPosition
            }
          }

          data.display = newDisplay;
          data.value = newDisplay;
          return data;
        },
        getData: function() {
          var data = [];
          var filterValue = '';
          var fullValue = this.$scope.getTextAreaValue();
          var valueFromCursor = this.$scope.getTextAreaValueFromCursor();
          var lastTokenType = this.$scope.options.parsingOptions.parser.getLastKnownTokenType(valueFromCursor);
          var tokenList = this.$scope.options.parsingOptions.parser.getTokenList(valueFromCursor);
          var endsWithSpace = valueFromCursor.substr(valueFromCursor.length - 1, 1) === ' ';

          var identifiers = [
            'firstName',
            'lastName',
            'username',
            'createdTimestamp'
          ];
          var comparisons = [
            '=',
            '!=',
            '>',
            '>=',
            '<',
            '<=',
            'in',
            'not in',
            'between',
            'not between',
            'is null',
            'is not null',
            'like'
          ];
          //TODO: implement order by
          var connectors = [
            'and',
            'or'//,
            //'order by'
          ];
          var orderWays = [
            'asc',
            'desc'
          ];
          var processRemoteData = function() {
            this.controller.setLoadingIndicator(true);

            $http({method: this.$scope.options.autoCompleteOptions.remoteDataMethod, url: this.$scope.options.autoCompleteOptions.generateDataUrl.apply(this)}).
            success(function(response, status, headers, config) {
              if(angular.isObject(response)) {
                this.controller.processData(this.$scope.options.autoCompleteOptions.responseParser(response));
              } else {
                this.controller.setNewIndicator(true);
              }

              this.controller.setLoadingIndicator(false);
            }.bind(this)).
            error(function(data, status, headers, config) {
              this.controller.setLoadingIndicator(false);
              //todo: proper error handling
            }.bind(this));
          }.bind(this);

          if((tokenList.length > 0 && endsWithSpace === false) || (tokenList.length > 1 && tokenList[tokenList.length - 1].type === 'unknown' && tokenList[tokenList.length - 2].value.indexOf('between') === -1)) {
            filterValue = tokenList[tokenList.length - 1].value;
          }

          switch(lastTokenType) {
            case 'identifier':
              data = comparisons;
              break;

            case 'comparison':
              if(tokenList[tokenList.length - 2].value.indexOf('between') !== -1) {
                if(tokenList[tokenList.length - 1].value.length === 1 && endsWithSpace === true) {
                  data = ['and']
                } else if(endsWithSpace === true || (tokenList[tokenList.length - 1].value.length === 1 && endsWithSpace !== true) || (tokenList[tokenList.length - 1].value.length === 2 && ((endsWithSpace !== true && tokenList[tokenList.length - 1].value[1] !== null) || endsWithSpace === true))) {
                  processRemoteData();
                }
              } else {
                processRemoteData();
              }
              break;

            case 'value':
                data = connectors;
              break;

            case 'connector':
              data = identifiers;
              break;

            case 'orderBy':
              data = identifiers;
              break;

            case 'orderByIdentifier':
              data = orderWays;
              break;

            case null:
              if(fullValue.length === 0 || tokenList.length === 1) {
                data = identifiers;
              }
              break;
          }

          if(data) {
            var filteredData = this.controller.filter(data, filterValue);

            if(filteredData.length === 1) {
              if(filteredData[0].display === filterValue) {
                filteredData = [];
              }
            }

            this.controller.processData(filteredData);
          }
        }
      }
    };
  }
]);