require('string-format-js');
var _ = require('lodash');
var BaseComponent = require('../base-component');

var InputExtendText = BaseComponent.extend({
  initialize: function(test, baseSelector) {
    this.baseSelector = baseSelector;
    this.selectors = {
      validIcon: '.icons span:nth-child(1)',
      invalidIcon: '.icons span:nth-child(2)',
      inputMessage: '.input-message',
      validInputMessage: '.input-message.success-text',
      invalidInputMessage: '.input-message.error-text'
    };

    BaseComponent.initialize.call(this, test, true);
  },

  isValid: function() {
    this.test.assert.visible(this.getSelector('validIcon'), 'valid icon');
    this.test.assert.notVisible(this.getSelector('invalidIcon'), 'invalid icon');
    this.test.assert.visible(this.getSelector('inputMessage'), 'input message');
    this.test.assert.attr(this.getSelector('inputMessage'), 'class').to.contain('success-text', 'class has success-text for input message');
  },

  isInvalid: function() {
    this.test.assert.notVisible(this.getSelector('validIcon'), 'valid icon');
    this.test.assert.visible(this.getSelector('invalidIcon'), 'invalid icon');
    this.test.assert.visible(this.getSelector('inputMessage'), 'input message');
    this.test.assert.attr(this.getSelector('inputMessage'), 'class').to.contain('error-text', 'class has error-text for input message');
  },

  validationNotVisible: function() {
    //the auto complete option can hide this so detecting by class
    this.test.assert.attr(this.getSelector('validIcon'), 'class').to.contain('ng-hide', 'class has ng-hide for valid icon');
    this.test.assert.attr(this.getSelector('invalidIcon'), 'class').to.contain('ng-hide', 'class has for invalid icon');
    this.test.assert.attr(this.getSelector('inputMessage'), 'class').to.contain('ng-hide', 'class has for input message');
  },

  validationIsVisible: function() {
    //the auto complete option can hide this so detecting by class
    this.test.assert.attr(this.getSelector('validIcon'), 'class').to.not.contain('ng-hide', 'class doesn\'t have ng-hide for valid icon');
    this.test.assert.attr(this.getSelector('invalidIcon'), 'class').to.not.contain('ng-hide', 'class doesn\'t have for invalid icon');
    this.test.assert.attr(this.getSelector('inputMessage'), 'class').to.not.contain('ng-hide', 'class doesn\'t have for input message');
  }
});

module.exports = InputExtendText;