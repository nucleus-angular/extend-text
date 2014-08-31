module.exports = function() {
  it('should add item when pressing enter key', function() {
    var page = this.genericPage.create('/tagging-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test\uE007');

    extendTextComponent.hasTags(['test']);
    extendTextComponent.hiddenValueIs('[{"display":"test","value":"test"}]');
  });

  it('should add item when pressing tab key', function() {
    var page = this.genericPage.create('/tagging-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test\uE007');

    extendTextComponent.hasTags(['test']);
    extendTextComponent.hiddenValueIs('[{"display":"test","value":"test"}]');
  });

  it('should allow for spaces', function() {
    var page = this.genericPage.create('/tagging-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test 1\uE007');

    extendTextComponent.hasTags(['test 1']);
    extendTextComponent.hiddenValueIs('[{"display":"test 1","value":"test 1"}]');
  });

  it('should not allow for duplicate tags', function() {
    var page = this.genericPage.create('/tagging-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test 1\uE007test 1\uE007');

    extendTextComponent.hasTags(['test 1']);
    extendTextComponent.hiddenValueIs('[{"display":"test 1","value":"test 1"}]');
  });

  it('should allow for multiple tags', function() {
    var page = this.genericPage.create('/tagging-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test\uE007test2\uE007');

    extendTextComponent.hasTags(['test', 'test2']);
    extendTextComponent.hiddenValueIs('[{"display":"test","value":"test"},{"display":"test2","value":"test2"}]');
  });

  it('should allow for duplicate tags', function() {
    var page = this.genericPage.create('/tagging-allow-duplicates');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test 1\uE007test 1\uE007');

    extendTextComponent.hasTags(['test 1','test 1']);
    extendTextComponent.hiddenValueIs('[{"display":"test 1","value":"test 1"},{"display":"test 1","value":"test 1"}]');
  });

  it('should select last tag when presssing delete', function() {
    var page = this.genericPage.create('/tagging-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test\uE007test1\uE007');
    extendTextComponent.type('\uE003');

    extendTextComponent.tagSelected('test1');
  });

  it('should delete selected tag when pressing delete and a tag is selected', function() {
    var page = this.genericPage.create('/tagging-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test\uE007test1\uE007');
    extendTextComponent.type('\uE003');
    extendTextComponent.type('\uE003');

    extendTextComponent.hasTags(['test']);
    extendTextComponent.hiddenValueIs('[{"display":"test","value":"test"}]');
  });

  it('should select select the last tag when pressing the left arrow', function() {
    var page = this.genericPage.create('/tagging-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test\uE007test1\uE007');
    extendTextComponent.type('\uE012');

    extendTextComponent.tagSelected('test1');
  });

  it('should select the previous tag when pressing the left arrow when a tag is currently selected', function() {
    var page = this.genericPage.create('/tagging-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test\uE007test1\uE007');
    extendTextComponent.type('\uE012');
    extendTextComponent.type('\uE012');

    extendTextComponent.tagSelected('test');
  });

  //TODO: test for height increase
};