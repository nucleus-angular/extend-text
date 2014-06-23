var GenericPage = require('./lib/objects/pages/generic');
var typeHelper = require('./lib/type-helper');

module.exports = {
  name: 'extend text form validation integration',

  'should not show validations if not pro-populating the value': function(test) {
    var genericPage = GenericPage.new(test, 'auto-complete-form-validation');
    var firstNameWrapper = genericPage.getInputExtendTextComponent('first-name');
    test.wait(500);

    firstNameWrapper.validationNotVisible();

    genericPage.done();
  },

  'should show validations if pre-populating the value': function(test) {
    var genericPage = GenericPage.new(test, 'auto-complete-form-validation');
    var lastNameWrapper = genericPage.getInputExtendTextComponent('last-name');
    test.wait(500);

    lastNameWrapper.isValid();

    genericPage.done();
  },

  'should show validations when value is updated': function(test) {
    var genericPage = GenericPage.new(test, 'auto-complete-form-validation');
    var firstName = genericPage.getExtendTextComponent('first-name');
    var firstNameWrapper = genericPage.getInputExtendTextComponent('first-name');
    test.wait(500);

    firstName.type('John' + typeHelper.specialCharacters.enter);

    firstNameWrapper.isValid();

    genericPage.done();
  },

  'should remove all validation display element when resetting a form': function(test) {
    var genericPage = GenericPage.new(test, 'auto-complete-form-validation');
    var firstName = genericPage.getExtendTextComponent('first-name');
    var firstNameWrapper = genericPage.getInputExtendTextComponent('first-name');
    var lastName = genericPage.getExtendTextComponent('last-name');
    var lastNameWrapper = genericPage.getInputExtendTextComponent('last-name');

    firstName.type('j' + typeHelper.specialCharacters.backspace);

    //make sure to remove the auto complete becuase it is hide certain elements
    genericPage.clickBody();

    test.click('.reset-form');

    firstNameWrapper.validationNotVisible();
    lastNameWrapper.validationNotVisible();

    genericPage.done();
  },

  'should show invalid message for a non-free form auto complete while typing a value': function(test) {
    var genericPage = GenericPage.new(test, 'auto-complete-form-validation');
    var firstName = genericPage.getExtendTextComponent('first-name');
    var firstNameWrapper = genericPage.getInputExtendTextComponent('first-name');
    test.wait(500);

    firstName.type('j');

    firstNameWrapper.isInvalid();

    genericPage.done();
  },

  'should show valid message for a free form auto complete while typing a value': function(test) {
    var genericPage = GenericPage.new(test, 'auto-complete-form-validation');
    var middleName = genericPage.getExtendTextComponent('middle-name');
    var middleNameWrapper = genericPage.getInputExtendTextComponent('middle-name');
    test.wait(500);

    middleName.type('j');

    middleNameWrapper.isValid();

    genericPage.done();
  },

  'should not show validations if not pro-populating the value (textarea)': function(test) {
    var genericPage = GenericPage.new(test, 'auto-complete-form-validation');
    var firstNameWrapper = genericPage.getInputExtendTextComponent('first-name-textarea');
    test.wait(500);

    firstNameWrapper.validationNotVisible();

    genericPage.done();
  },

  'should show validations if pre-populating the value (textarea)': function(test) {
    var genericPage = GenericPage.new(test, 'auto-complete-form-validation');
    var lastNameWrapper = genericPage.getInputExtendTextComponent('last-name-textarea');
    test.wait(500);

    lastNameWrapper.isValid();

    genericPage.done();
  },

  'should show validations when value is updated (textarea)': function(test) {
    var genericPage = GenericPage.new(test, 'auto-complete-form-validation');
    var firstName = genericPage.getExtendTextComponent('first-name-textarea');
    var firstNameWrapper = genericPage.getInputExtendTextComponent('first-name-textarea');
    test.wait(500);

    firstName.type('John' + typeHelper.specialCharacters.enter);

    firstNameWrapper.isValid();

    genericPage.done();
  },

  'should remove all validation display element when resetting a form (textarea)': function(test) {
    var genericPage = GenericPage.new(test, 'auto-complete-form-validation');
    var firstName = genericPage.getExtendTextComponent('first-name-textarea');
    var firstNameWrapper = genericPage.getInputExtendTextComponent('first-name-textarea');
    var lastName = genericPage.getExtendTextComponent('last-name-textarea');
    var lastNameWrapper = genericPage.getInputExtendTextComponent('last-name-textarea');

    firstName.type('j' + typeHelper.specialCharacters.backspace);

    //make sure to remove the auto complete becuase it is hide certain elements
    genericPage.clickBody();

    test.click('.reset-form');

    firstNameWrapper.validationNotVisible();
    lastNameWrapper.validationNotVisible();

    genericPage.done();
  },

  'should show invalid message for a non-free form auto complete while typing a value (textarea)': function(test) {
    var genericPage = GenericPage.new(test, 'auto-complete-form-validation');
    var firstName = genericPage.getExtendTextComponent('first-name-textarea');
    var firstNameWrapper = genericPage.getInputExtendTextComponent('first-name-textarea');
    test.wait(500);

    firstName.type('j');

    firstNameWrapper.isInvalid();

    genericPage.done();
  },

  'should show valid message for a free form auto complete while typing a value (textarea)': function(test) {
    var genericPage = GenericPage.new(test, 'auto-complete-form-validation');
    var middleName = genericPage.getExtendTextComponent('middle-name-textarea');
    var middleNameWrapper = genericPage.getInputExtendTextComponent('middle-name-textarea');
    test.wait(500);

    middleName.type('j');

    middleNameWrapper.isValid();

    genericPage.done();
  }
};