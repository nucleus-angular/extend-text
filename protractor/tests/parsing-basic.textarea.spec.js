describe('parsing basic (textarea)', function() {
  before(function() {
    this.genericPage = require('../lib/page/generic');
    this.getTextarea = true;
  });

  it('should default to empty state', function() {
    var page = this.genericPage.create('/parsing-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.searchQueryInEmptyState();
  });

  it('should be in in invalid state with invalid query', function() {
    var page = this.genericPage.create('/parsing-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test =');

    extendTextComponent.searchQueryInInvalidState('Error on line 1 at character 7');
  });

  it('should be in in valid state with valid query', function() {
    var page = this.genericPage.create('/parsing-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test = 1');

    extendTextComponent.searchQueryInValidState();
  });

  it('should let you click on validation icon and your cursor should move to the location of the error', function() {
    var page = this.genericPage.create('/parsing-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test  2 and test = 2');
    extendTextComponent.clickSearchQueryValidationIcon();
    extendTextComponent.type('\uE003');

    extendTextComponent.hiddenValueIs('test 2 and test = 2');
  });

  it('should let you click on validation icon when error is at the end of the query', function() {
    var page = this.genericPage.create('/parsing-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test = 2 and test = 2 and');
    extendTextComponent.clickSearchQueryValidationIcon();
    extendTextComponent.type('\uE003');

    extendTextComponent.hiddenValueIs('test = 2 and test = 2 an');
  });

  it('should let you click on validation icon when there is error on multi-lined query', function() {
    var page = this.genericPage.create('/parsing-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test\n= 2\nand test\n2');
    extendTextComponent.clickSearchQueryValidationIcon();
    extendTextComponent.type('\uE003');

    extendTextComponent.displayValueIs('test\n= 2\nand tes\n2');
  });
});