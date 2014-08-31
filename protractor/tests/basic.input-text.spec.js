describe('basic functionality (text input)', function() {
  before(function() {
    this.genericPage = require('../lib/page/generic');
    this.getTextarea = false;
  });

  require('./shared-tests/basic')();

  it('should work well with the auto focus component', function() {
    var page = this.genericPage.create('/auto-focus');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.isFocused();
  });

  it('should be able to configure that the form submit when hitting enter on none tagging element', function() {
    var page = this.genericPage.create('/allow-submit-on-enter');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test\uE007');

    page.redirectedToFormSubmitPage('test');
  });
});