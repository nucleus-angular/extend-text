var protractorTestObjects = require('protractor-test-objects');
var extendTextComponent = require('../components/extend-text');
var inputExtendTextComponent = require('../components/input-extend-text');
var genericPage = protractorTestObjects.basePage.create();
var _ = require('lodash');

genericPage.baseSelector = 'body';

genericPage.getExtendTextComponent = function(isTextarea) {
  if(_.isString(isTextarea)) {
    var dataId = isTextarea;
  } else {
    var dataId = isTextarea === true ? 'textarea' : 'input';
  }

  return extendTextComponent.create('.main-content [data-id="{0}"]'.format(dataId));
};

genericPage.getInputExtendTextComponent = function(isTextarea) {
  if(_.isString(isTextarea)) {
    var dataId = isTextarea;
  } else {
    var dataId = isTextarea === true ? 'textarea' : 'input';
  }

  return inputExtendTextComponent.create('.main-content [data-id="{0}"]'.format(dataId + '-wrapper'));
};

genericPage.clickBody = function() {
  $('body').click();
};

genericPage.redirectedToFormSubmitPage = function(value) {
  expect(browser.driver.getCurrentUrl()).to.eventually.equal('http://localhost:3000/allow-submit-on-enter?allowSubmitOnEnterInput={0}'.format(value));
  //this.test.assert.url('http://localhost:3000/allow-submit-on-enter?allowSubmitOnEnterInput=%s'.format(value), 'page redirected with form data')
};

genericPage.noRedirectedToFormSubmitPage = function() {
  expect(browser.driver.getCurrentUrl()).to.eventually.equal('http://localhost:3000/allow-submit-on-enter');
  //this.test.wait(1000);
  //this.test.assert.url('http://localhost:3000/allow-submit-on-enter', 'page did not redirected with form data')
};

genericPage.objectModelDisplayIs = function(objectString) {
  expect($('.object-model-display').getText()).to.eventually.equal(objectString);
  //this.test.assert.text('.object-model-display').is(objectString, 'object model set properly');
};

module.exports = {
  create: function(baseUrl, appendUrl) {
    baseUrl = baseUrl || '/home';
    var newPage = Object.create(genericPage);
    newPage.baseUrl = baseUrl;
    newPage.open(appendUrl);
    return newPage;
  }
};
