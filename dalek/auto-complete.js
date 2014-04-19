var GenericPage = require('./lib/objects/pages/generic');
var testBuilder = require('./lib/test-builder');
var searchDelay = 350;

var tests = {
  'should show no options message when no matched found and free form in not enabled': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-basic');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('nomatch');
    test.wait(searchDelay);

    extendTextComponent.noMatches();

    extendTextComponent.done();
  },

  'should show loading message while data in being retrieved': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-basic');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('dataloading');
    test.wait(searchDelay);

    extendTextComponent.loadingIndicatorVisible();

    extendTextComponent.done();
  },

  'should be able to get a list of auto complete options': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-basic');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('tes');
    test.wait(searchDelay);

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'test1', valaue: 1},
      {display: 'test2', valaue: 2},
      {display: 'test3', valaue: 3},
      {display: 'test4', valaue: 4},
      {display: 'test5', valaue: 5}
    ]);

    extendTextComponent.done();
  },

  'should be able to select an option that has a value of a string': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-string-value');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('tes');
    test.wait(searchDelay);
    extendTextComponent.clickAutoCompleteItem(1);
    extendTextComponent.clickBody();

    extendTextComponent.displayValueIs('test1');
    extendTextComponent.hiddenValueIs('t1');

    extendTextComponent.done();
  },

  'should be able to select an option that has a value of a number': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-number-value');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('tes');
    test.wait(searchDelay);
    extendTextComponent.clickAutoCompleteItem(2);
    extendTextComponent.clickBody();

    extendTextComponent.displayValueIs('test2');
    extendTextComponent.hiddenValueIs('2');

    extendTextComponent.done();
  },

  'should not load auto complete options until the load character count has been reached': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-character-count');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('te');
    test.wait(searchDelay);

    extendTextComponent.autoCompleteHidden();

    extendTextComponent.type('s');
    test.wait(searchDelay);

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'test1', valaue: 1},
      {display: 'test2', valaue: 2},
      {display: 'test3', valaue: 3},
      {display: 'test4', valaue: 4},
      {display: 'test5', valaue: 5}
    ]);

    extendTextComponent.done();
  },

  'should properly set the display value and data-value attribute for the auto complete options': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-display-value');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('tes');
    test.wait(searchDelay);

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'test1', valaue: 1},
      {display: 'test2', valaue: 2},
      {display: 'test3', valaue: 3},
      {display: 'test4', valaue: 4},
      {display: 'test5', valaue: 5}
    ]);

    extendTextComponent.done();
  },

  'should not allow free form data by default': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-no-free-form-text');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('testa');
    extendTextComponent.clickBody();

    extendTextComponent.displayValueIs('');
    extendTextComponent.hiddenValueIs('');

    extendTextComponent.done();
  },

  'should be able to define a custom response parser': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-custom-response-parser');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('use');
    test.wait(searchDelay);

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'user1', valaue: 1},
      {display: 'user2', valaue: 2},
      {display: 'user3', valaue: 3},
      {display: 'user4', valaue: 4},
      {display: 'user5', valaue: 5}
    ]);

    extendTextComponent.done();
  },

  'should be able to define a custom variable name': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-custom-variable-name');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('varname');
    test.wait(searchDelay);

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'varname1', valaue: 1},
      {display: 'varname2', valaue: 2}
    ]);

    extendTextComponent.done();
  },

  'should be able to define a custom variable formatter': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-custom-variable-format');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('varformat');
    test.wait(searchDelay);

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'varformat1', valaue: 1},
      {display: 'varformat2', valaue: 2}
    ]);

    extendTextComponent.done();
  },

  'should be able to define a custom url generator': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-custom-data-url-generator');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('cus');
    test.wait(searchDelay);

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'custom url1', valaue: 1},
      {display: 'custom url2', valaue: 2},
      {display: 'custom url3', valaue: 3},
      {display: 'custom url4', valaue: 4},
      {display: 'custom url5', valaue: 5}
    ]);

    extendTextComponent.done();
  },

  'should not attempt to pull data until that search deley time have been reached': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-delay');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('del');
    test.wait(450);

    extendTextComponent.autoCompleteHidden();

    test.wait(500);

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'delay1', valaue: 1},
      {display: 'delay2', valaue: 2},
      {display: 'delay3', valaue: 3},
      {display: 'delay4', valaue: 4},
      {display: 'delay5', valaue: 5}
    ]);

    extendTextComponent.done();
  },

  'should select first item in auto complete options list': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-select-first-option');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('tes');
    test.wait(searchDelay);

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'test1', valaue: 1},
      {display: 'test2', valaue: 2},
      {display: 'test3', valaue: 3},
      {display: 'test4', valaue: 4},
      {display: 'test5', valaue: 5}
    ]);

    extendTextComponent.done();
  },

  'should select items when bluring input': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-select-on-blur');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('selectblur');
    test.wait(searchDelay);
    extendTextComponent.clickBody();

    extendTextComponent.displayValueIs('selectblur1');
    extendTextComponent.hiddenValueIs(1)

    extendTextComponent.done();
  },

  'should set input values properly when allowing free form text': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-allow-free-form-text');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('freeform');

    extendTextComponent.displayValueIs('freeform');
    extendTextComponent.hiddenValueIs('freeform');

    extendTextComponent.done();
  },

  'should load options on click when using local data': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-local-data');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.clickInput();

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'local 1', valaue: 'l1'},
      {display: 'lcal 2', valaue: 'l2'},
      {display: 'local 3', valaue: 'l3'},
      {display: 'lcal 4', valaue: 'l4'},
      {display: 'local 5', valaue: 'l5'}
    ]);

    extendTextComponent.done();
  },

  'should be able to select option when using local data': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-local-data');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.clickInput();
    extendTextComponent.clickAutoCompleteItem(3);

    extendTextComponent.displayValueIs('local 3');
    extendTextComponent.hiddenValueIs('l3');

    extendTextComponent.done();
  },

  'should use filter method when using local data': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-local-data');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('lo');

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'local 1', valaue: 'l1'},
      {display: 'local 3', valaue: 'l3'},
      {display: 'local 5', valaue: 'l5'}
    ]);

    extendTextComponent.done();
  },

  'should be able to define a custom filter method for local data': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-local-data-custom-filter');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('tes');

    extendTextComponent.autoCompleteHidden();

    extendTextComponent.type('t');

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'local 1', valaue: 'l1'},
      {display: 'lcal 2', valaue: 'l2'},
      {display: 'local 3', valaue: 'l3'},
      {display: 'lcal 4', valaue: 'l4'},
      {display: 'local 5', valaue: 'l5'}
    ]);

    extendTextComponent.done();
  },

  'should show new indicator when allowing free form and what the user entered does not match any values in the auto complete list': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-local-data-allow-free-form-text');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('local');

    extendTextComponent.newInlineIndicatorVisible();

    extendTextComponent.done();
  },

  'should show new indicator when allowing free form and what the user entered does not filter to include any data': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-allow-free-form-text');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('data');

    extendTextComponent.newInlineIndicatorVisible();

    extendTextComponent.done();
  },

  'should show new indicator as an option instead of text in the input': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-allow-free-form-text-in-options');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('local');

    extendTextComponent.newInlineIndicatorHidden();
    extendTextComponent.newAutoCompleteIndicatorVisible('local');

    extendTextComponent.done();
  },

  'should be able to set custom setValue method': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-custom-set-value');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('tes');
    extendTextComponent.clickAutoCompleteItem(1);

    extendTextComponent.displayValueIs('tetest1');
    extendTextComponent.hiddenValueIs('1-value');

    extendTextComponent.done();
  },

  'should be able to set custom get data method': function(test, type) {
    var isTextarea = type === 'textarea' ? true : false;
    var genericPage = GenericPage.new(test, 'auto-complete-custom-get-data');
    var extendTextComponent = genericPage.getExtendTextComponent(isTextarea);

    extendTextComponent.type('get');

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'getdata 1', valaue: 1},
      {display: 'getdata 2', valaue: 2}
    ]);

    extendTextComponent.done();
  }
};

module.exports = testBuilder('extend text auto complete', tests);