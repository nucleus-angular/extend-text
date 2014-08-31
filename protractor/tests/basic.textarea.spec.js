describe('basic functionality (textarea)', function() {
  before(function() {
    this.genericPage = require('../lib/page/generic');
    this.getTextarea = true;
  });

  require('./shared-tests/basic')();

  it('should work well with the auto focus component', function() {
    var page = this.genericPage.create('/auto-focus-textarea');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.isFocused();
  });

  it('should be able to configure that the form does not submit when hitting enter on textarea input', function() {
    var page = this.genericPage.create('/allow-submit-on-enter');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test\uE007');

    page.noRedirectedToFormSubmitPage();
  });

  it('should automatically increase height', function() {
    var page = this.genericPage.create('/auto-complete-auto-height');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.inputHeightIs('40px');

    extendTextComponent.type('1\n1\n1');

    extendTextComponent.inputHeightIs('55px');
  });

  it('should not automatically increase height', function() {
    var page = this.genericPage.create('/no-auto-height');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.inputHeightIs('40px');

    extendTextComponent.type('1\n1\n1\n1');

    extendTextComponent.inputHeightIs('40px');
  });
});