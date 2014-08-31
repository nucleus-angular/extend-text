require('string-format')
var protractorTestObjects = require('protractor-test-objects');
var extendTextComponent = protractorTestObjects.baseComponent.create();
var _ = require('lodash');

extendTextComponent.selectors = {
  displayInput: '.display',
  hiddenInput: 'input[type="hidden"]',
  allAutoCompleteItems: '.auto-complete-options ul li',
  autoCompleteItem: '.auto-complete-options ul li:nth-child({0})',
  allTags: '.tag-container .tag',
  tagText: '.tag-container .tag:nth-child({0}) .text',
  tagTextSelected: '.tag-container .tag.selected .text',
  newInlineIndicator: '.new-indicator',
  newAutoCompleteIndicator: '.auto-complete-options .new',
  noMatchesIndicator: '.no-matches',
  loadingIndicator: '.loading',
  inputsContainer: '.inputs',
  searchQueryValidationIcon: '.tooltip .handle',
  searchQueryTooltipContent: '.tooltip .content'
};

extendTextComponent.type = function(keys, protractorCall) {
  if(protractorCall !== false) {
    $(this.getSelector('displayInput')).sendKeys(keys);
  } else {
    //this is for the times we don't want to wait for angular
    browser.driver.findElement(by.css(this.getSelector('displayInput'))).sendKeys(keys);
  }
};

extendTextComponent.clickAutoCompleteItem = function(index) {
  $(this.getSelector('autoCompleteItem').format(index)).click();
};

extendTextComponent.clickInput = function() {
  $(this.getSelector('displayInput')).click();
};

extendTextComponent.clickSearchQueryValidationIcon = function() {
  $(this.getSelector('searchQueryValidationIcon')).click();
};

extendTextComponent.moveToValidationIcon = function() {
  browser.actions().mouseMove($(this.getSelector('searchQueryValidationIcon'))).perform();
  //this.test.moveTo(this.getSelector('searchQueryValidationIcon'));
  //this.waitForAngular();
};

extendTextComponent.clickBody = function() {
  $('body').click();
};

extendTextComponent.hiddenValueIs = function(value) {
  expect($(this.getSelector('hiddenInput')).getAttribute('value')).to.eventually.equal(value);
};

extendTextComponent.displayValueIs = function(value) {
  expect($(this.getSelector('displayInput')).getAttribute('value')).to.eventually.equal(value);
};

extendTextComponent.hasTags = function(displayValues) {
  var tagCount = displayValues.length;

  //this.test.assert.numberOfVisibleElements(this.getSelector('allTags'), tagCount, '%d tags entered'.format(tagCount));
  expect(this.getNumberOfVisibleElements(this.getSelector('allTags'))).to.eventually.equal(tagCount);

  _.forEach(displayValues, function(displayValue, key) {
    expect($(this.getSelector('tagText').format(key + 1)).getAttribute('data-value')).to.eventually.equal(displayValue);
    //this.test.assert.attr(this.getSelector('tagText').format(key + 1), 'data-value').is(displayValue, displayValue + ' entered in tag list');
  }, this);

  this.displayValueIs('');
};

extendTextComponent.autoCompleteCountIs = function(count) {
  expect(this.getNumberOfElements(this.getSelector('allAutoCompleteItems'))).to.eventually.equal(count);
  //this.test.assert.numberOfVisibleElements(this.getSelector('allAutoCompleteItems'), count, 'auto complete should have %d options available'.format(count));
};

extendTextComponent.autoCompleteHidden = function(protractorCall) {
  if(protractorCall !== false) {
    expect($(this.getSelector('allAutoCompleteItems')).isPresent()).to.eventually.be.false;
  } else {
    //this is needed to be able to test that the auto complete items don't show between typing and the delayed search
    expect(browser.driver.findElements(by.css(this.getSelector('allAutoCompleteItems')))).to.eventually.deep.equal([]);
  }
  //this.test.assert.doesntExist(this.getSelector('allAutoCompleteItems'), 'auto complete options should not be visible until 3 character have been insert in the input');
};

extendTextComponent.autoCompleteDisplayIs = function(index, value) {
  //expect(browser.driver.findElement(by.css(this.getSelector('autoCompleteItem').format(index))).getText()).to.eventually.equal(value);
  expect($(this.getSelector('autoCompleteItem').format(index)).getText()).to.eventually.equal(value);
  //this.test.assert.text(this.getSelector('autoCompleteItem').format(index), value, 'auto complete options display value set');
};

extendTextComponent.autoCompleteDataValueIs = function(index, value) {
  //expect(browser.driver.findElement(by.css(this.getSelector('autoCompleteItem').format(index))).getAttribute('data-value')).to.eventually.equal(value);
  expect($(this.getSelector('autoCompleteItem').format(index)).getAttribute('data-value')).to.eventually.equal(value);
  //this.test.assert.attr(this.getSelector('autoCompleteItem').format(index), 'data-value', value, 'auto complete options data value set')
};

extendTextComponent.hasAutoCompleteOptions = function(options) {
  this.autoCompleteCountIs(options.length);

  _.forEach(options, function(option, key) {
    this.autoCompleteDisplayIs(key + 1, option.display);
    this.autoCompleteDataValueIs(key + 1, option.value)
  }, this);
};

extendTextComponent.tagSelected = function(tagValue) {
  expect($(this.getSelector('tagTextSelected')).getAttribute('data-value')).to.eventually.equal(tagValue);
  //this.test.assert.attr(this.getSelector('tagTextSelected'), 'data-value').is(tagValue, tagValue + ' tag selected')
};

extendTextComponent.newInlineIndicatorVisible = function() {
  expect($(this.getSelector('newInlineIndicator')).isDisplayed()).to.eventually.be.true;
  //this.test.assert.visible(this.getSelector('newInlineIndicator'), 'new inline indicator visible');
};

extendTextComponent.newInlineIndicatorHidden = function() {
  expect($(this.getSelector('newInlineIndicator')).isPresent()).to.eventually.be.false;
  //this.test.assert.doesntExist(this.getSelector('newInlineIndicator'), 'new inline indicator hidden');
};

extendTextComponent.newAutoCompleteIndicatorVisible = function(input) {
  expect($(this.getSelector('newAutoCompleteIndicator')).isDisplayed()).to.eventually.be.true;
  expect($(this.getSelector('newAutoCompleteIndicator')).getText()).to.eventually.equal('{0} (New)'.format(input))
  //this.test.assert.visible(this.getSelector('newAutoCompleteIndicator'), 'new indicator visible in auto complete list')
  //this.test.assert.text(this.getSelector('newAutoCompleteIndicator'), '%s (New)'.format(input), 'new option text matches input with new indicator text')
};

extendTextComponent.noMatches = function() {
  expect($(this.getSelector('noMatchesIndicator')).isDisplayed()).to.eventually.be.true;
  //this.test.assert.visible(this.getSelector('noMatchesIndicator'), 'no matches indicator visible');
};

extendTextComponent.loadingIndicatorVisible = function() {
  //we can't wait for angular here because this will never show while angular is still process the $http request
  expect(browser.driver.findElement(by.css(this.getSelector('loadingIndicator'))).isDisplayed()).to.eventually.be.true;
  //this.test.assert.visible(this.getSelector('loadingIndicator'), 'loading indicator visible');
};

extendTextComponent.searchQueryInInvalidState = function(helpMessage) {
  this.searchQueryHasClass('invalid');
  this.searchQueryHasHelpMessage(helpMessage);
};

extendTextComponent.searchQueryInEmptyState = function() {
  this.searchQueryHasClass('empty');
};

extendTextComponent.searchQueryInValidState = function() {
  this.searchQueryHasClass('valid');
};

extendTextComponent.searchQueryHasClass = function(cssClass) {
  expect($(this.getSelector('inputsContainer')).getAttribute('class')).to.eventually.contain(cssClass);
  //this.test.assert.attr(this.getSelector('inputsContainer'), 'class').to.contain(cssClass, 'has correct state');
};

extendTextComponent.searchQueryHasHelpMessage = function(helpMessage) {
  this.moveToValidationIcon();
  expect($(this.getSelector('searchQueryTooltipContent')).getText()).to.eventually.equal(helpMessage)
  //this.test.assert.text(this.getSelector('searchQueryTooltipContent')).is(helpMessage, 'has correct help message');
};

extendTextComponent.inputHeightIs = function(height) {
  expect($(this.getSelector('displayInput')).getCssValue('height')).to.eventually.equal(height);
  //this.test.assert.css(this.getSelector('displayInput'), 'height', height);
};

extendTextComponent.isFocused = function() {
  //since the auto focus is done within an evalAsync(), need to wait for angular
  browser.waitForAngular();

  expect(browser.executeScript(function(selector) {
    return $(selector).is(':focus');
  }, this.getSelector('displayInput'))).to.eventually.be.true;
}

module.exports = {
  create: function(baseSelector) {
    var newComponent = Object.create(extendTextComponent);
    newComponent.baseSelector = baseSelector;
    return newComponent;
  }
};
