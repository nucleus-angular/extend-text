require('string-format-js');
var _ = require('lodash');
var BasePageObject = require('../base-page-object');
var ExtendTextComponent = require('../components/extend-text');
var InputExtendTextComponent = require('../components/input-extend-text');

var GenericPage = BasePageObject.extend({
  initialize: function(test, pageName, urlAppend) {
    this.pageName = pageName;

    //TODO: when dalekjs support setting baseurl in config, move http://localhost:3000 to config file and out of here
    this.baseUrl = 'http://localhost:3000/' + pageName;

    BasePageObject.initialize.call(this, test, urlAppend, true);
  },

  getExtendTextComponent: function(isTextarea) {
    if(_.isString(isTextarea)) {
      var dataId = isTextarea;
    } else {
      var dataId = isTextarea === true ? 'textarea' : 'input';
    }

    return ExtendTextComponent.new(this.test, '.main-content [data-id="%s"]'.format(dataId));
  },

  getInputExtendTextComponent: function(isTextarea) {
    if(_.isString(isTextarea)) {
      var dataId = isTextarea;
    } else {
      var dataId = isTextarea === true ? 'textarea' : 'input';
    }

    return InputExtendTextComponent.new(this.test, '.main-content [data-id="%s"]'.format(dataId + '-wrapper'));
  },

  //TODO: refactor assertion so http://localhost:3000 does not need to be in test
  redirectedToFormSubmitPage: function(value) {
    this.test.assert.url('http://localhost:3000/allow-submit-on-enter?allowSubmitOnEnterInput=%s'.format(value), 'page redirected with form data')
  },

  noRedirectedToFormSubmitPage: function() {
    this.test.wait(1000);
    this.test.assert.url('http://localhost:3000/allow-submit-on-enter', 'page did not redirected with form data')
  },

  objectModelDisplayIs: function(objectString) {
    this.test.assert.text('.object-model-display').is(objectString, 'object model set properly');
  }
});

module.exports = GenericPage;
