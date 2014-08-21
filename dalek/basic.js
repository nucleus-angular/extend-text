var GenericPage = require('./lib/objects/pages/generic');
var testBuilder = require('./lib/test-builder');

//test that should have for both input and textarea
var tests = {
  'should keep display and hidden input in sync with empty configuration': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'empty');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('test');

    extendTextComponent.displayValueIs('test');
    extendTextComponent.hiddenValueIs('test');

    extendTextComponent.done();
  },

  //TODO: figure out how to test that an element is focus
  'should work well with the auto focus component': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-focus');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.done();
  },

  //TODO: research
  'should be able to configure that text gets selected when input is focused': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'select-on-focus');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.done();
  },

  'should be able to configure the initial value': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'set-data');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.displayValueIs('Configuration');
    extendTextComponent.hiddenValueIs('config');

    extendTextComponent.done();
  }
};

var dalekExportObject = testBuilder('extend text basic', tests);

//specific tests for input
dalekExportObject['should be able to configure that the form submit when hitting enter on none tagging element'] = function(test) {
  var isTextarea = false;
  var genericPage = GenericPage.new(test, 'allow-submit-on-enter');
  var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

  extendTextComponent.type('test\uE007');

  genericPage.redirectedToFormSubmitPage('test');

  extendTextComponent.done();
};

//specific test for textarea
dalekExportObject['should be able to configure that the form does not submit when hitting enter on textarea input'] = function(test) {
  var isTextarea = true;
  var genericPage = GenericPage.new(test, 'allow-submit-on-enter');
  var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

  extendTextComponent.type('test\uE007');

  genericPage.noRedirectedToFormSubmitPage();

  extendTextComponent.done();
};

dalekExportObject['should automatically increase height (textarea)'] = function(test) {
  var genericPage = GenericPage.new(test, 'auto-complete-auto-height');
  var extendTextComponent = genericPage.getExtendTextComponent(true);

  extendTextComponent.inputHeightIs('40px');

  extendTextComponent.type('1\n1\n1');

  extendTextComponent.inputHeightIs('55px');

  genericPage.done();
};

dalekExportObject['should not automatically increase height (textarea)'] = function(test) {
  var genericPage = GenericPage.new(test, 'no-auto-height');
  var extendTextComponent = genericPage.getExtendTextComponent(true);

  extendTextComponent.inputHeightIs('40px');

  extendTextComponent.type('1\n1\n1\n1');

  extendTextComponent.inputHeightIs('40px');

  genericPage.done();
};

module.exports = dalekExportObject;