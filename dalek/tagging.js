var _ = require('lodash');

var hasTags = function(test, baseSelector, displayValues, hiddenValue) {
  test.assert.visible(baseSelector + ' .tag-container .tag:nth-child(' + displayValues.length + ')', 'tag list visible');

  _.forEach(displayValues, function(displayValue, key) {
    test.assert.attr(baseSelector + ' .tag-container .tag:nth-child(' + (key + 1) + ') .text', 'data-value').is(displayValue, displayValue + ' entered in tag list');
  });

  test.assert.attr(baseSelector + ' input[type="hidden"]', 'value').is(hiddenValue, 'tag data entered into hidden input');
  test.assert.attr(baseSelector + ' input.display', 'value').is('', 'display input empty');
};

var tagSelected = function(test, baseSelector, tagValue) {
  test.assert.attr(baseSelector + ' .tag-container .tag.selected .text', 'data-value').is(tagValue, tagValue + ' tag selected')
};

module.exports = {
  name: 'extend text with tagging enabled',
  
  'should add item when pressing enter key': function(test) {
    test.open('http://localhost:3000/tagging-basic')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="tagging"] .container')
    .type('[data-id="tagging-basic"] .display', 'test\uE007');
    
    hasTags(test, '[data-id="tagging-basic"]', ['test'], '[{"display":"test","value":"test"}]');

    test.done();
  },
  
  'should add item when pressing tab key': function(test) {
    test.open('http://localhost:3000/tagging-basic')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="tagging"] .container')
    .type('[data-id="tagging-basic"] .display', 'test\uE004');
    
    hasTags(test, '[data-id="tagging-basic"]', ['test'], '[{"display":"test","value":"test"}]');

    test.done();
  },
  
  'should allow for spaces': function(test) {
    test.open('http://localhost:3000/tagging-basic')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="tagging"] .container')
    .type('[data-id="tagging-basic"] .display', 'test 1\uE007');
    
    hasTags(test, '[data-id="tagging-basic"]', ['test 1'], '[{"display":"test 1","value":"test 1"}]');

    test.done();
  },
  
  'should not allow for duplicate tags': function(test) {
    test.open('http://localhost:3000/tagging-basic')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="tagging"] .container')
    .type('[data-id="tagging-basic"] .display', 'test 1\uE007test 1\uE007');
    
    hasTags(test, '[data-id="tagging-basic"]', ['test 1'], '[{"display":"test 1","value":"test 1"}]');

    test.done();
  },
  
  'should allow for multiple tags': function(test) {
    test.open('http://localhost:3000/tagging-allow-duplicates')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="tagging-allow-duplicates"] .container')
    .type('[data-id="tagging-allow-duplicates"] .display', 'test\uE007test\uE007');
    
    hasTags(test, '[data-id="tagging-allow-duplicates"]', ['test', 'test'], '[{"display":"test","value":"test"},{"display":"test","value":"test"}]');

    test.done();
  },

  'should be able to double click tag to edit': function(test) {
    //TODO: implement - waiting on dalekjs to support double click
    test.done();
  },

  'should select last tag when presssing delete': function(test) {
    test.open('http://localhost:3000/tagging-basic')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="tagging-basic"] .container')
    .type('[data-id="tagging-basic"] .display', 'test\uE007test1\uE007')
    .type('[data-id="tagging-basic"] .display', '\uE003');
    
    tagSelected(test, '[data-id="tagging-basic"]', 'test1');

    test.done();
  },

  'should delete selected tag when pressing delete and a tag is selected': function(test) {
    test.open('http://localhost:3000/tagging-basic')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="tagging-basic"] .container')
    .type('[data-id="tagging-basic"] .display', 'test\uE007test1\uE007')
    .type('[data-id="tagging-basic"] .display', '\uE003')
    .type('[data-id="tagging-basic"] .display', '\uE003');
    
    hasTags(test, '[data-id="tagging-basic"]', ['test'], '[{"display":"test","value":"test"}]');

    test.done();
  },

  'should select select the last tag when pressing the left arrow': function(test) {
    test.open('http://localhost:3000/tagging-basic')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="tagging-basic"] .container')
    .type('[data-id="tagging-basic"] .display', 'test\uE007test1\uE007')
    .type('[data-id="tagging-basic"] .display', '\uE012');
    
    tagSelected(test, '[data-id="tagging-basic"]', 'test1');

    test.done();
  },

  'should select the previous tag when pressing the left arrow when a tag is currently selected': function(test) {
    test.open('http://localhost:3000/tagging-basic')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="tagging-basic"] .container')
    .type('[data-id="tagging-basic"] .display', 'test\uE007test1\uE007')
    .type('[data-id="tagging-basic"] .display', '\uE012')
    .type('[data-id="tagging-basic"] .display', '\uE012');
    
    tagSelected(test, '[data-id="tagging-basic"]', 'test');

    test.done();
  }
};