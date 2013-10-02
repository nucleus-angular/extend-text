angular.module('demo.home.routing', [
  'demo.core'
])
.config([
  '$locationProvider',
  '$routeProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('demo.home', {
      url: '',
      abstract: true,
      views: {
        '': {
          templateUrl: '/app/components/core/assets/templates/module-wrapper.html'
        }
      }
    });
  }
]);

angular.module('demo.home', [
  'demo.home.routing',
  'demo.home.emptyConfig',
  'demo.home.emptyConfigWithAutoFocus',
  'demo.home.selectOnFocus',
  'demo.home.allowSubmitOnEnter',
  'demo.home.setDataInConfig',
  'demo.home.autoCompleteLoadOptions',
  'demo.home.autoCompleteLoadOptionsDisplayValue',
  'demo.home.autoCompleteLoadOptionsAttributeValue',
  'demo.home.autoCompleteCustomResponseParser',
  'demo.home.autoCompleteCustomVariableName',
  'demo.home.autoCompleteCustomVariableFormat',
  'demo.home.autoCompletePostData',
  'demo.home.autoCompleteCustomUrlGenerator',
  'demo.home.autoCompleteLoadCharacterCount',
  'demo.home.autoCompleteNoFreeFormText',
  'demo.home.autoCompleteSearchDelay',
  'demo.home.autoCompleteSelectOnBlur',
  'demo.home.autoCompleteAllowFreeFormText',
  'demo.home.tagging',
]);