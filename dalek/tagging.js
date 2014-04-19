var GenericPage = require('./lib/objects/pages/generic');
var testBuilder = require('./lib/test-builder');

var tests = {
  'should add item when pressing enter key': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'tagging-basic');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('test\uE007');

    extendTextComponent.hasTags(['test']);
    extendTextComponent.hiddenValueIs('[{"display":"test","value":"test"}]');

    extendTextComponent.done();
  },

  'should add item when pressing tab key': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'tagging-basic');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('test\uE007');

    extendTextComponent.hasTags(['test']);
    extendTextComponent.hiddenValueIs('[{"display":"test","value":"test"}]');

    extendTextComponent.done();
  },

  'should allow for spaces': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'tagging-basic');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('test 1\uE007');

    extendTextComponent.hasTags(['test 1']);
    extendTextComponent.hiddenValueIs('[{"display":"test 1","value":"test 1"}]');

    extendTextComponent.done();
  },

  'should not allow for duplicate tags': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'tagging-basic');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('test 1\uE007test 1\uE007');

    extendTextComponent.hasTags(['test 1']);
    extendTextComponent.hiddenValueIs('[{"display":"test 1","value":"test 1"}]');

    extendTextComponent.done();
  },

  'should allow for multiple tags': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'tagging-allow-duplicates');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('test\uE007test2\uE007');

    extendTextComponent.hasTags(['test', 'test2']);
    extendTextComponent.hiddenValueIs('[{"display":"test","value":"test"},{"display":"test2","value":"test2"}]');

    extendTextComponent.done();
  },

  'should be able to double click tag to edit': function(test, type) {
    //TODO: implement - waiting on dalekjs to support double click
    test.done();
  },

  'should select last tag when presssing delete': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'tagging-basic');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('test\uE007test1\uE007');
    extendTextComponent.type('\uE003');

    extendTextComponent.tagSelected('test1');

    extendTextComponent.done();
  },

  'should delete selected tag when pressing delete and a tag is selected': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'tagging-basic');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('test\uE007test1\uE007');
    extendTextComponent.type('\uE003');
    extendTextComponent.type('\uE003');

    extendTextComponent.hasTags(['test']);
    extendTextComponent.hiddenValueIs('[{"display":"test","value":"test"}]');

    extendTextComponent.done();
  },

  'should select select the last tag when pressing the left arrow': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'tagging-basic');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('test\uE007test1\uE007');
    extendTextComponent.type('\uE012');

    extendTextComponent.tagSelected('test1');

    extendTextComponent.done();
  },

  'should select the previous tag when pressing the left arrow when a tag is currently selected': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'tagging-basic');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('test\uE007test1\uE007');
    extendTextComponent.type('\uE012');
    extendTextComponent.type('\uE012');

    extendTextComponent.tagSelected('test');

    extendTextComponent.done();
  }
};

module.exports = testBuilder('extend text tagging', tests);