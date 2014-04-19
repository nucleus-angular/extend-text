var GenericPage = require('./lib/objects/pages/generic');

module.exports = {
  name: 'extend text form integration',

  'should reset properly when form reset event is triggered': function(test) {
    var genericPage = GenericPage.new(test, 'auto-complete-reset-form');
    test.wait(500);
    var firstName = genericPage.getExtendTextComponent();
    var lastName = genericPage.getExtendTextComponent(true);

    firstName.displayValueIs('John');
    firstName.hiddenValueIs('John');
    lastName.displayValueIs('Doe');
    lastName.hiddenValueIs('Doe');

    test.click('.reset-form')

    firstName.displayValueIs('');
    firstName.hiddenValueIs('');
    lastName.displayValueIs('');
    lastName.hiddenValueIs('');

    genericPage.done();
  },

  'should should update model properly': function(test) {
    var genericPage = GenericPage.new(test, 'auto-complete-reset-form');
    test.wait(500);

    genericPage.objectModelDisplayIs('{"firstName":"John","lastName":"Doe"}');

    test.click('.reset-form');

    genericPage.objectModelDisplayIs('{"firstName":"","lastName":""}');

    genericPage.done();
  }
};