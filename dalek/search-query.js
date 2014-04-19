var GenericPage = require('./lib/objects/pages/generic');
module.exports = {
  name: 'extend text search query',

  'should default to empty state': function(test) {
    var genericPage = GenericPage.new(test, 'search-query-auto-height');
    var extendTextComponent = genericPage.getExtendTextComponent(true);

    extendTextComponent.searchQueryInEmptyState();

    genericPage.done();
  },

  'should be in in invalid state with invalid query': function(test) {
    var genericPage = GenericPage.new(test, 'search-query-auto-height');
    var extendTextComponent = genericPage.getExtendTextComponent(true);

    extendTextComponent.type('test =');

    extendTextComponent.searchQueryInInvalidState('Error on line 1 at character 7');

    genericPage.done();
  },

  'should be in in valid state with valid query': function(test) {
    var genericPage = GenericPage.new(test, 'search-query-auto-height');
    var extendTextComponent = genericPage.getExtendTextComponent(true);

    extendTextComponent.type('test = 1');

    extendTextComponent.searchQueryInValidState();

    genericPage.done();
  },

  'should let you click on validation icon and your cursor should move to the location of the error': function(test) {
    var genericPage = GenericPage.new(test, 'search-query-auto-height');
    var extendTextComponent = genericPage.getExtendTextComponent(true);

    extendTextComponent.type('test  2 and test = 2');
    extendTextComponent.clickSearchQueryValidationIcon();
    extendTextComponent.type('\uE003');

    extendTextComponent.hiddenValueIs('test 2 and test = 2');

    genericPage.done();
  },

  'should let you click on validation icon when error is at the end of the query': function(test) {
    var genericPage = GenericPage.new(test, 'search-query-auto-height');
    var extendTextComponent = genericPage.getExtendTextComponent(true);

    extendTextComponent.type('test = 2 and test = 2 and');
    extendTextComponent.clickSearchQueryValidationIcon();
    extendTextComponent.type('\uE003');

    extendTextComponent.hiddenValueIs('test = 2 and test = 2 an');

    genericPage.done();
  },

  'should let you click on validation icon when there is error on multi-lined query': function(test) {
    var genericPage = GenericPage.new(test, 'search-query-auto-height');
    var extendTextComponent = genericPage.getExtendTextComponent(true);

    extendTextComponent.type('test\n= 2\nand test\n2');
    extendTextComponent.clickSearchQueryValidationIcon();
    extendTextComponent.type('\uE003');

    extendTextComponent.displayValueIs('test\n= 2\nand tes\n2');

    genericPage.done();
  },

  'should automatically increase height': function(test) {
    var genericPage = GenericPage.new(test, 'search-query-auto-height');
    var extendTextComponent = genericPage.getExtendTextComponent(true);

    extendTextComponent.inputHeightIs('28px');

    extendTextComponent.type('test = 2 \nand test = 2');

    extendTextComponent.inputHeightIs('40px');

    genericPage.done();
  },

  'should not automatically increase height': function(test) {
    var genericPage = GenericPage.new(test, 'search-query-no-auto-height');
    var extendTextComponent = genericPage.getExtendTextComponent(true);

    extendTextComponent.inputHeightIs('28px');

    extendTextComponent.type('test = 2 and test = 2');

    extendTextComponent.inputHeightIs('28px');

    genericPage.done();
  }
};