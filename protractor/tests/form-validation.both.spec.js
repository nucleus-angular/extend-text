describe('form validation (text input and textarea)', function() {
  before(function() {
    this.genericPage = require('../lib/page/generic');
  });

  it('should not show validations if not pro-populating the value', function() {
    var page = this.genericPage.create('/auto-complete-form-validation');
    var firstNameWrapper = page.getInputExtendTextComponent('first-name');

    firstNameWrapper.validationNotVisible();
  });

  it('should show validations if pre-populating the value', function() {
    var page = this.genericPage.create('/auto-complete-form-validation');
    var lastNameWrapper = page.getInputExtendTextComponent('last-name');

    lastNameWrapper.isValid();
  });

  it('should show validations when value is updated', function() {
    var page = this.genericPage.create('/auto-complete-form-validation');
    var firstName = page.getExtendTextComponent('first-name');
    var firstNameWrapper = page.getInputExtendTextComponent('first-name');

    firstName.type('John' + protractor.Key.ENTER);

    firstNameWrapper.isValid();
  });

  it('should remove all validation display element when resetting a form', function() {
    var page = this.genericPage.create('/auto-complete-form-validation');
    var firstName = page.getExtendTextComponent('first-name');
    var firstNameWrapper = page.getInputExtendTextComponent('first-name');
    var lastName = page.getExtendTextComponent('last-name');
    var lastNameWrapper = page.getInputExtendTextComponent('last-name');

    firstName.type('j' + protractor.Key.BACK_SPACE);

    //make sure to remove the auto complete becuase it is hide certain elements
    page.clickBody();

    $('.reset-form').click();

    firstNameWrapper.validationNotVisible();
    lastNameWrapper.validationNotVisible();
  });

  it('should show invalid message for a non-free form auto complete while typing a value', function() {
    var page = this.genericPage.create('/auto-complete-form-validation');
    var firstName = page.getExtendTextComponent('first-name');
    var firstNameWrapper = page.getInputExtendTextComponent('first-name');

    firstName.type('j');

    firstNameWrapper.isInvalid();
  });

  it('should show valid message for a free form auto complete while typing a value', function() {
    var page = this.genericPage.create('/auto-complete-form-validation');
    var middleName = page.getExtendTextComponent('middle-name');
    var middleNameWrapper = page.getInputExtendTextComponent('middle-name');

    middleName.type('j');

    middleNameWrapper.isValid();
  });

  it('should not show validations if not pro-populating the value (textarea)', function() {
    var page = this.genericPage.create('/auto-complete-form-validation');
    var firstNameWrapper = page.getInputExtendTextComponent('first-name-textarea');

    firstNameWrapper.validationNotVisible();
  });

  it('should show validations if pre-populating the value (textarea)', function() {
    var page = this.genericPage.create('/auto-complete-form-validation');
    var lastNameWrapper = page.getInputExtendTextComponent('last-name-textarea');

    lastNameWrapper.isValid();
  });

  it('should show validations when value is updated (textarea)', function() {
    var page = this.genericPage.create('/auto-complete-form-validation');
    var firstName = page.getExtendTextComponent('first-name-textarea');
    var firstNameWrapper = page.getInputExtendTextComponent('first-name-textarea');

    firstName.type('John' + protractor.Key.ENTER);

    firstNameWrapper.isValid();
  });

  it('should remove all validation display element when resetting a form (textarea)', function() {
    var page = this.genericPage.create('/auto-complete-form-validation');
    var firstName = page.getExtendTextComponent('first-name-textarea');
    var firstNameWrapper = page.getInputExtendTextComponent('first-name-textarea');
    var lastName = page.getExtendTextComponent('last-name-textarea');
    var lastNameWrapper = page.getInputExtendTextComponent('last-name-textarea');

    firstName.type('j' + protractor.Key.BACK_SPACE);

    //make sure to remove the auto complete becuase it is hide certain elements
    page.clickBody();

    $('.reset-form').click();

    firstNameWrapper.validationNotVisible();
    lastNameWrapper.validationNotVisible();
  });

  it('should show invalid message for a non-free form auto complete while typing a value (textarea)', function() {
    var page = this.genericPage.create('/auto-complete-form-validation');
    var firstName = page.getExtendTextComponent('first-name-textarea');
    var firstNameWrapper = page.getInputExtendTextComponent('first-name-textarea');

    firstName.type('j');

    firstNameWrapper.isInvalid();
  });

  it('should show valid message for a free form auto complete while typing a value (textarea)', function() {
    var page = this.genericPage.create('/auto-complete-form-validation');
    var middleName = page.getExtendTextComponent('middle-name-textarea');
    var middleNameWrapper = page.getInputExtendTextComponent('middle-name-textarea');

    middleName.type('j');

    middleNameWrapper.isValid();
  });
});