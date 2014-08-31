module.exports = function() {
  it('should keep display and hidden input in sync with empty configuration', function() {
    var page = this.genericPage.create('/empty');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test');

    extendTextComponent.displayValueIs('test');
    extendTextComponent.hiddenValueIs('test');
  });

  it('should be able to configure the initial value', function() {
    var page = this.genericPage.create('/set-data');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.displayValueIs('Configuration');
    extendTextComponent.hiddenValueIs('config');
  });
};