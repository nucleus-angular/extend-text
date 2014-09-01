var protractorTestObjects = require('protractor-test-objects');
var inputTextElementComponent = protractorTestObjects.baseComponent.create();

inputTextElementComponent.selectors = {
  validIndicator: '.valid-indicator .icon',
  invalidIndicator: '.invalid-indicator .handle'
};

inputTextElementComponent.isValid = function() {
  expect($(this.getSelector('validIndicator')).isDisplayed()).to.eventually.be.true;
  expect($(this.getSelector('invalidIndicator')).isDisplayed()).to.eventually.be.false;
};

inputTextElementComponent.isInvalid = function() {
  expect($(this.getSelector('validIndicator')).isDisplayed()).to.eventually.be.false;
  expect($(this.getSelector('invalidIndicator')).isDisplayed()).to.eventually.be.true;
};

inputTextElementComponent.validationNotVisible = function() {
  expect($(this.getSelector('validIndicator')).isDisplayed()).to.eventually.be.false;
  expect($(this.getSelector('invalidIndicator')).isDisplayed()).to.eventually.be.false;
};

inputTextElementComponent.validationIsVisible = function() {
  expect($(this.getSelector('validIndicator')).isDisplayed()).to.eventually.be.true;
  expect($(this.getSelector('invalidIndicator')).isDisplayed()).to.eventually.be.true;
};

module.exports = {
  create: function(baseSelector) {
    var newComponent = Object.create(inputTextElementComponent);
    newComponent.baseSelector = baseSelector;
    return newComponent;
  }
};
