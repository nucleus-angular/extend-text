describe('basic parsing (text input and textarea)', function() {
  before(function() {
    this.genericPage = require('../lib/page/generic');
  });

  it('should reset properly when form reset event is triggered', function() {
    var page = this.genericPage.create('/auto-complete-reset-form');
    var firstName = page.getExtendTextComponent();
    var lastName = page.getExtendTextComponent(true);

    firstName.displayValueIs('John');
    firstName.hiddenValueIs('John');
    lastName.displayValueIs('Doe');
    lastName.hiddenValueIs('Doe');

    $('.reset-form').click();

    firstName.displayValueIs('');
    firstName.hiddenValueIs('');
    lastName.displayValueIs('');
    lastName.hiddenValueIs('');
  });

  it('should default to empty state', function() {
    var page = this.genericPage.create('/auto-complete-reset-form');

    page.objectModelDisplayIs('{"firstName":"John","lastName":"Doe"}');

    $('.reset-form').click();

    page.objectModelDisplayIs('{"firstName":"","lastName":""}');
  });
});