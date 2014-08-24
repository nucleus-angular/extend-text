require('string-format-js');
var _ = require('lodash');
var BaseComponent = require('../base-component');

var InputExtendText = BaseComponent.extend({
  initialize: function(test, baseSelector) {
    this.baseSelector = baseSelector;
    this.selectors = {
      validIndicator: '.valid-indicator .icon',
      invalidIndicator: '.invalid-indicator .handle'
    };

    BaseComponent.initialize.call(this, test, true);
  },

  isValid: function() {
    this.test.assert.visible(this.getSelector('validIndicator'));
    this.test.assert.notVisible(this.getSelector('invalidIndicator'));
  },

  isInvalid: function() {
    this.test.assert.notVisible(this.getSelector('validIndicator'));
    this.test.assert.visible(this.getSelector('invalidIndicator'));
  },

  validationNotVisible: function() {
    this.test.assert.doesntExist(this.getSelector('validIndicator'), 'invalid icon');
    this.test.assert.doesntExist(this.getSelector('invalidIndicator'), 'invalid icon');
  },

  validationIsVisible: function() {
    this.test.assert.exists(this.getSelector('validIndicator'), 'invalid icon');
    this.test.assert.exists(this.getSelector('invalidIndicator'), 'invalid icon');
  }
});

module.exports = InputExtendText;
