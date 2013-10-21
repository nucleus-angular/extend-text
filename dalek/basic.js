
module.exports = {
  name: 'extend text component',

  'should keep display and hidden input in sync with empty configuration': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="empty-options"] .container')
    .type('[data-id="empty-options"] .display', 'test')
      .assert.val('[data-id="empty-options"] .display', 'test', 'Entered text into display input')
      .assert.val('[data-id="empty-options"] input[type="hidden"]', 'test', "Hidden input has been updated based on text inserted into the display input")
    .done();
  },

  //todo: figure out how to test that an element is focus
  'should work well with the auto focus component': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="empty-options-auto-focus"] .container')
      //.assert.attr('[data-id="empty-options-auto-focus"] .display', 'focus', true) : todo : figure out how to select active component
    .done();
  },

  //todo: research
  'should be able to configure that text gets selected when input is focused': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="select-on-focus"] .container')
    .type('[data-id="select-on-focus"] .display', 'test')
    .click('body')
    //todo: This is an issue because the selection of the text happen after the backspace
    //.type('[data-id="select-on-focus"] .display', '\uE003')
      //.assert.attr('[data-id="select-on-focus"] .display', 'value', '')
    .done();
  },

  'should be able to configure that the form submit when hitting enter on none tagging element': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="allow-submit-on-enter"] .container')
    .type('[data-id="allow-submit-on-enter"] .display', 'test\uE007')
      .assert.url('http://localhost:3000/home?allowSubmitOnEnter=test', 'URL has the form data in it')
    .done();
  },

  'should be able to configure the initial value': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="set-data"] .container')
      .assert.val('[data-id="set-data"] .display', 'Configuration', 'Display input defaults to configured value')
      .assert.val('[data-id="set-data"] input[type="hidden"]', 'config', "Hidden input defaults to configured value")
    .done();
  }
};