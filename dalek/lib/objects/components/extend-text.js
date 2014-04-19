require('string-format-js');
var _ = require('lodash');
var BaseComponent = require('../base-component');


var ExtendTextComponent = BaseComponent.extend({
  initialize: function(test, baseSelector) {
    this.baseSelector = baseSelector;
    this.selectors = {
      displayInput: '.display',
      hiddenInput: 'input[type="hidden"]',
      allAutoCompleteItems: '.auto-complete-options ul li',
      autoCompleteItem: '.auto-complete-options ul li:nth-child(%d)',
      allTags: '.tag-container .tag',
      tagText: '.tag-container .tag:nth-child(%d) .text',
      tagTextSelected: '.tag-container .tag.selected .text',
      newInlineIndicator: '.new-indicator',
      newAutoCompleteIndicator: '.auto-complete-options .new',
      noMatchesIndicator: '.no-matches',
      loadingIndicator: '.loading',
      inputsContainer: '.inputs',
      searchQueryValidationIcon: '.validation-icon',
      searchQueryTooltipContent: '.tooltip .content'
    };

    BaseComponent.initialize.call(this, test, true);
  },

  //actions

  type: function(keys) {
    this.test.type(this.getSelector('displayInput'), keys);
  },

  clickAutoCompleteItem: function(index) {
    this.test.click(this.getSelector('autoCompleteItem').format(index));
  },

  clickInput: function() {
    this.test.click(this.getSelector('displayInput'));
  },

  clickSearchQueryValidationIcon: function() {
    this.test.click(this.getSelector('searchQueryValidationIcon'));
  },

  moveToValidationIcon: function() {
    this.test.moveTo(this.getSelector('searchQueryValidationIcon'));
    this.waitForAngular();
  },

  //assertions

  hiddenValueIs: function(value) {
    this.test.assert.val(this.getSelector('hiddenInput'), value, 'hidden value set');
  },

  displayValueIs: function(value) {
    this.test.assert.val(this.getSelector('displayInput'), value, 'display value set');
  },

  hasTags: function(displayValues) {
    var tagCount = displayValues.length;

    this.test.assert.numberOfVisibleElements(this.getSelector('allTags'), tagCount, '%d tags entered'.format(tagCount));

    _.forEach(displayValues, function(displayValue, key) {
      this.test.assert.attr(this.getSelector('tagText').format(key + 1), 'data-value').is(displayValue, displayValue + ' entered in tag list');
    }, this);

    this.displayValueIs('');
  },

  autoCompleteCountIs: function(count) {
    this.test.assert.numberOfVisibleElements(this.getSelector('allAutoCompleteItems'), count, 'auto complete should have %d options available'.format(count));
  },

  autoCompleteHidden: function() {
    this.test.assert.doesntExist(this.getSelector('allAutoCompleteItems'), 'auto complete options should not be visible until 3 character have been insert in the input');
  },

  autoCompleteDisplayIs: function(index, value) {
    this.test.assert.text(this.getSelector('autoCompleteItem').format(index), value, 'auto complete options display value set');
  },

  autoCompleteDataValueIs: function(index, value) {
    this.test.assert.attr(this.getSelector('autoCompleteItem').format(index), 'data-value', value, 'auto complete options data value set')
  },

  hasAutoCompleteOptions: function(options) {
    this.autoCompleteCountIs(options.length);

    _.forEach(options, function(option, key) {
      this.autoCompleteDisplayIs(key + 1, option.display);
      this.autoCompleteDataValueIs(key + 1, option.value)
    }, this);
  },

  tagSelected: function(tagValue) {
    this.test.assert.attr(this.getSelector('tagTextSelected'), 'data-value').is(tagValue, tagValue + ' tag selected')
  },

  newInlineIndicatorVisible: function() {
    this.test.assert.visible(this.getSelector('newInlineIndicator'), 'new inline indicator visible');
  },

  newInlineIndicatorHidden: function() {
    this.test.assert.doesntExist(this.getSelector('newInlineIndicator'), 'new inline indicator hidden');
  },

  newAutoCompleteIndicatorVisible: function(input) {
    this.test.assert.visible(this.getSelector('newAutoCompleteIndicator'), 'new indicator visible in auto complete list')
    this.test.assert.text(this.getSelector('newAutoCompleteIndicator'), '%s (New)'.format(input), 'new option text matches input with new indicator text')
  },

  noMatches: function() {
    this.test.assert.visible(this.getSelector('noMatchesIndicator'), 'no matches indicator visible');
  },

  loadingIndicatorVisible: function() {
    this.test.assert.visible(this.getSelector('loadingIndicator'), 'loading indicator visible');
  },

  searchQueryInInvalidState: function(helpMessage) {
    this.searchQueryHasClass('invalid');
    this.searchQueryHasHelpMessage(helpMessage);
  },

  searchQueryInEmptyState: function() {
    this.searchQueryHasClass('empty');
  },

  searchQueryInValidState: function() {
    this.searchQueryHasClass('valid');
  },

  searchQueryHasClass: function(cssClass) {
    this.test.assert.attr(this.getSelector('inputsContainer'), 'class').to.contain(cssClass, 'has correct state');
  },

  searchQueryHasHelpMessage: function(helpMessage) {
    this.moveToValidationIcon();
    this.test.assert.text(this.getSelector('searchQueryTooltipContent')).is(helpMessage, 'has correct help message');
  },

  inputHeightIs: function(height) {
    this.test.assert.css(this.getSelector('displayInput'), 'height', height);
  }
});

module.exports = ExtendTextComponent;