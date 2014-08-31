module.exports = function () {
  it('should show loading message while data in being retrieved', function() {
    var page = this.genericPage.create('/auto-complete-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);
    //since the rest of the call will not wait for angular, we need to do it manually here
    browser.waitForAngular();

    extendTextComponent.type('dataloading', false);

    browser.driver.sleep(500);

    extendTextComponent.loadingIndicatorVisible();
  });

  it('should be able to get a list of auto complete options', function() {
    var page = this.genericPage.create('/auto-complete-basic');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('test1');

    extendTextComponent.noMatches();

    extendTextComponent.type(page.repeatKeys(protractor.Key.ARROW_LEFT, 2));

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'test1', value: '1'},
      {display: 'test2', value: '2'},
      {display: 'test3', value: '3'},
      {display: 'test4', value: '4'},
      {display: 'test5', value: '5'}
    ]);
  });

  it('should be able to select an option that has a value of a string', function() {
    var page = this.genericPage.create('/auto-complete-string-value');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('tes');
    extendTextComponent.clickAutoCompleteItem(1);
    extendTextComponent.clickBody();

    extendTextComponent.displayValueIs('test1');
    extendTextComponent.hiddenValueIs('t1');
  });

  it('should be able to select an option that has a value of a number', function() {
    var page = this.genericPage.create('/auto-complete-number-value');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('tes');
    extendTextComponent.clickAutoCompleteItem(2);
    extendTextComponent.clickBody();

    extendTextComponent.displayValueIs('test2');
    extendTextComponent.hiddenValueIs('2');
  });

  it('should not load auto complete options until the load character count has been reached', function() {
    var page = this.genericPage.create('/auto-complete-character-count');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('te');

    extendTextComponent.autoCompleteHidden();

    extendTextComponent.type('s');

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'test1', value: '1'},
      {display: 'test2', value: '2'},
      {display: 'test3', value: '3'},
      {display: 'test4', value: '4'},
      {display: 'test5', value: '5'}
    ]);
  });

  it('should properly set the display value and data-value attribute for the auto complete options', function() {
    var page = this.genericPage.create('/auto-complete-display-value');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('tes');

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'test1', value: '1'},
      {display: 'test2', value: '2'},
      {display: 'test3', value: '3'},
      {display: 'test4', value: '4'},
      {display: 'test5', value: '5'}
    ]);
  });

  it('should not allow free form data by default', function() {
    var page = this.genericPage.create('/auto-complete-no-free-form-text');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('testa');
    extendTextComponent.clickBody();

    extendTextComponent.displayValueIs('');
    extendTextComponent.hiddenValueIs('');
  });

  it('should be able to define a custom response parser', function() {
    var page = this.genericPage.create('/auto-complete-custom-response-parser');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('use');

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'user1', value: '1'},
      {display: 'user2', value: '2'},
      {display: 'user3', value: '3'},
      {display: 'user4', value: '4'},
      {display: 'user5', value: '5'}
    ]);
  });

  it('should be able to define a custom variable name', function() {
    var page = this.genericPage.create('/auto-complete-custom-variable-name');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('varname');

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'varname1', value: '1'},
      {display: 'varname2', value: '2'}
    ]);
  });

  it('should be able to define a custom variable formatter', function() {
    var page = this.genericPage.create('/auto-complete-custom-variable-format');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('varformat');

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'varformat1', value: '1'},
      {display: 'varformat2', value: '2'}
    ]);
  });

  it('should be able to define a custom url generator', function() {
    var page = this.genericPage.create('/auto-complete-custom-data-url-generator');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('cus');

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'custom url1', value: '1'},
      {display: 'custom url2', value: '2'},
      {display: 'custom url3', value: '3'},
      {display: 'custom url4', value: '4'},
      {display: 'custom url5', value: '5'}
    ]);
  });

  it('should not attempt to pull data until that search deley time have been reached', function() {
    var page = this.genericPage.create('/auto-complete-delay');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);
    //since the rest of the call will not wait for angular, we need to do it manually here
    browser.waitForAngular();

    extendTextComponent.type('del', false);

    browser.driver.sleep(200);

    extendTextComponent.autoCompleteHidden(false);
  });

  it('should select first item in auto complete options list', function() {
    var page = this.genericPage.create('/auto-complete-select-first-option');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('tes');

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'test1', value: '1'},
      {display: 'test2', value: '2'},
      {display: 'test3', value: '3'},
      {display: 'test4', value: '4'},
      {display: 'test5', value: '5'}
    ]);
  });

  it('should select items when bluring input', function() {
    var page = this.genericPage.create('/auto-complete-select-on-blur');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('selectblur');
        extendTextComponent.clickBody();

    extendTextComponent.displayValueIs('selectblur1');
    extendTextComponent.hiddenValueIs('1')
  });

  it('should set input values properly when allowing free form text', function() {
    var page = this.genericPage.create('/auto-complete-allow-free-form-text');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('freeform');

    extendTextComponent.displayValueIs('freeform');
    extendTextComponent.hiddenValueIs('freeform');
  });

  it('should load options on click when using local data', function() {
    var page = this.genericPage.create('/auto-complete-local-data');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.clickInput();

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'local 1', value: 'l1'},
      {display: 'lcal 2', value: 'l2'},
      {display: 'local 3', value: 'l3'},
      {display: 'lcal 4', value: 'l4'},
      {display: 'local 5', value: 'l5'}
    ]);
  });

  it('should be able to select option when using local data', function() {
    var page = this.genericPage.create('/auto-complete-local-data');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.clickInput();
    extendTextComponent.clickAutoCompleteItem(3);

    extendTextComponent.displayValueIs('local 3');
    extendTextComponent.hiddenValueIs('l3');
  });

  it('should use filter method when using local data', function() {
    var page = this.genericPage.create('/auto-complete-local-data');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('lo');

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'local 1', value: 'l1'},
      {display: 'local 3', value: 'l3'},
      {display: 'local 5', value: 'l5'}
    ]);
  });

  it('should be able to define a custom filter method for local data', function() {
    var page = this.genericPage.create('/auto-complete-local-data-custom-filter');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('tes');

    extendTextComponent.autoCompleteHidden();

    extendTextComponent.type('t');

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'local 1', value: 'l1'},
      {display: 'lcal 2', value: 'l2'},
      {display: 'local 3', value: 'l3'},
      {display: 'lcal 4', value: 'l4'},
      {display: 'local 5', value: 'l5'}
    ]);
  });

  it('should show new indicator when allowing free form and what the user entered does not match any values in the auto complete list', function() {
    var page = this.genericPage.create('/auto-complete-local-data-allow-free-form-text');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('local');

    extendTextComponent.newInlineIndicatorVisible();
  });

  it('should show new indicator when allowing free form and what the user entered does not filter to include any data', function() {
    var page = this.genericPage.create('/auto-complete-allow-free-form-text');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('data');

    extendTextComponent.newInlineIndicatorVisible();
  });

  it('should show new indicator as an option instead of text in the input', function() {
    var page = this.genericPage.create('/auto-complete-allow-free-form-text-in-options');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('local');

    extendTextComponent.newInlineIndicatorHidden();
    extendTextComponent.newAutoCompleteIndicatorVisible('local');
  });

  it('should be able to set custom setValue method', function() {
    var page = this.genericPage.create('/auto-complete-custom-set-value');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('tes');
    extendTextComponent.clickAutoCompleteItem(1);

    extendTextComponent.displayValueIs('tetest1');
    extendTextComponent.hiddenValueIs('1-value');
  });

  it('should be able to set custom get data method', function() {
    var page = this.genericPage.create('/auto-complete-custom-get-data');
    var extendTextComponent = page.getExtendTextComponent(this.getTextarea);

    extendTextComponent.type('get');

    extendTextComponent.hasAutoCompleteOptions([
      {display: 'getdata 1', value: '1'},
      {display: 'getdata 2', value: '2'}
    ]);
  });
};
