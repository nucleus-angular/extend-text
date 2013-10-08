module.exports = {
  name: 'extend text component with auto complete enabled',

  'should be able to get a list of auto complete options': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete"] .container')
    .type('[data-id="auto-complete"] .display', 'tes')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete"] .auto-complete-options ul li:nth-child(5)')
      .assert.numberOfVisibleElements('.auto-complete-options ul li', 5, 'auto complete should have 5 options available')
    .done();
  },

  'should not load auto complete options until the load character count has been reached': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-character-count"] .container')
    .type('[data-id="auto-complete-character-count"] .display', 'te')
      .assert.doesntExist('[data-id="auto-complete-character-count"] auto-complete-options ul li', 'auto complete options should not be visible until 3 character have been insert in the input')
    .type('[data-id="auto-complete-character-count"] .display', 's')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-character-count"] .auto-complete-options ul li:nth-child(5')
      .assert.numberOfVisibleElements('[data-id="auto-complete-character-count"] .auto-complete-options ul li', 5, 'auto complete should have 5 options available')
    .done();
  },

  'should properly set the display value for the auto complete options': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-display-value"] .container')
    .type('[data-id="auto-complete-display-value"] .display', 'tes')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-display-value"] .auto-complete-options ul li:nth-child(5)')
      .assert.chain()
        .numberOfElements('[data-id="auto-complete-display-value"] .auto-complete-options ul li', 5, 'auto complete should have 5 options available')
        .text('[data-id="auto-complete-display-value"] .auto-complete-options ul li:nth-child(1)', 'test1', 'auto complete options should have proper display value')
        .text('[data-id="auto-complete-display-value"] .auto-complete-options ul li:nth-child(2)', 'test2', 'auto complete options should have proper display value')
        .text('[data-id="auto-complete-display-value"] .auto-complete-options ul li:nth-child(3)', 'test3', 'auto complete options should have proper display value')
        .text('[data-id="auto-complete-display-value"] .auto-complete-options ul li:nth-child(4)', 'test4', 'auto complete options should have proper display value')
        .text('[data-id="auto-complete-display-value"] .auto-complete-options ul li:nth-child(5)', 'test5', 'auto complete options should have proper display value')
      .end()
    .done();
  },

  'should properly set the data-value attribute for the auto complete options': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-attribute-value"] .container')
    .type('[data-id="auto-complete-attribute-value"] .display', 'tes')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-attribute-value"] .auto-complete-options ul li:nth-child(5)')
      .assert.chain()
        .numberOfElements('[data-id="auto-complete-attribute-value"] .auto-complete-options ul li', 5, 'auto complete should have 5 options available')
        .attr('[data-id="auto-complete-attribute-value"] .auto-complete-options ul li:nth-child(1)', 'data-value', 1, 'auto complete options should have proper attribute value')
        .attr('[data-id="auto-complete-attribute-value"] .auto-complete-options ul li:nth-child(2)', 'data-value', 2, 'auto complete options should have proper attribute value')
        .attr('[data-id="auto-complete-attribute-value"] .auto-complete-options ul li:nth-child(3)', 'data-value', 3, 'auto complete options should have proper attribute value')
        .attr('[data-id="auto-complete-attribute-value"] .auto-complete-options ul li:nth-child(4)', 'data-value', 4, 'auto complete options should have proper attribute value')
        .attr('[data-id="auto-complete-attribute-value"] .auto-complete-options ul li:nth-child(5)', 'data-value', 5, 'auto complete options should have proper attribute value')
      .end()
    .done();
  },

  'should not allow free form data by default': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-no-free-form-text"] .container')
    .type('[data-id="auto-complete-no-free-form-text"] .display', 'testa')
    .click('body')
      .assert.chain()
        .val('[data-id="auto-complete-no-free-form-text"] .display', '', 'display input should be empty when clicking outside of the input and no option is selected')
        .val('[data-id="auto-complete-no-free-form-text"] input[type="hidden"]', '', "hidden input should be empty when clicking outside of the input and no option is selected")
      .end()
    .done();
  },

  'should be able to define a custom response parser': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-custom-response-parser"] .container')
    .type('[data-id="auto-complete-custom-response-parser"] .display', 'use')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-custom-response-parser"] .auto-complete-options ul li:nth-child(5)')
      .assert.chain()
        .numberOfElements('[data-id="auto-complete-custom-response-parser"] .auto-complete-options ul li', 5, 'auto complete should have 5 options available')
        .query('[data-id="auto-complete-custom-response-parser"] .auto-complete-options ul li:nth-child(1)')
          .text('user1', 'auto complete options should have proper display value')
          .attr('data-value', 1, 'auto complete options should have proper attribute value')
        .end()
      .end()
    .done();
  },

  'should be able to define a custom variable name': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-custom-variable-name"] .container')
    .type('[data-id="auto-complete-custom-variable-name"] .display', 'varname')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-custom-variable-name"] .auto-complete-options ul li:nth-child(2)')
      .assert.chain()
        .numberOfElements('[data-id="auto-complete-custom-variable-name"] .auto-complete-options ul li', 2, 'auto complete should have 5 options available')
        .query('[data-id="auto-complete-custom-variable-name"] .auto-complete-options ul li:nth-child(1)')
          .text('varname1', 'auto complete options should have proper display value')
          .attr('data-value', 1, 'auto complete options should have proper attribute value')
        .end()
      .end()
    .done();
  },

  'should be able to define a custom variable formatter': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-custom-variable-format"] .container')
    .type('[data-id="auto-complete-custom-variable-format"] .display', 'varformat')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-custom-variable-format"] .auto-complete-options ul li:nth-child(2)')
      .assert.chain()
        .numberOfElements('[data-id="auto-complete-custom-variable-format"] .auto-complete-options ul li', 2, 'auto complete should have 5 options available')
        .query('[data-id="auto-complete-custom-variable-format"] .auto-complete-options ul li:nth-child(1)')
          .text('varformat1', 'auto complete options should have proper display value')
          .attr('data-value', 1, 'auto complete options should have proper attribute value')
        .end()
      .end()
    .done();
  },

  //todo: implement
  'should be able to define the method used for retriving the data': function(test) {
    test.done();
  },

  //todo: implement
  'should be able to define a custom url generator': function(test) {
    test.done();
  },

  //todo: implement
  'should not attempt to pul data until that search deley time have been reached': function(test) {
    test.done();
  },

  'should select first item in auto complete options list': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-select-first-option"] .container')
    .type('[data-id="auto-complete-select-first-option"] .display', 'tes')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-select-first-option"] .auto-complete-options ul li:nth-child(5)')
      .assert.attr('[data-id="auto-complete-select-first-option"] .auto-complete-options ul li:nth-child(1)', 'class').to.contain('is-focus', 'has focused class')
    .done();
  },

  'should select items when bluring input': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-select-on-blur"] .container')
    .type('[data-id="auto-complete-select-on-blur"] .display', 'selectblur')
    //angular - need to wait for angular to render this container
    .wait(1000)
    .click('body')
    .wait(1000)
      .assert.val('[data-id="auto-complete-select-on-blur"] .display', 'selectblur1', 'display input should be set to the display value of the first option')
      .assert.val('[data-id="auto-complete-select-on-blur"] input[type="hidden"]', '1', "hidden input should be set to thevalue of the data-value attribute of the first option")
    .done();
  },

  'should allow free form text should have single option': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-allow-free-form-text"] .container')
    .type('[data-id="auto-complete-allow-free-form-text"] .display', 'freeform')
    //angular - need to wait for angular to render this container
    .waitForElement('[data-id="auto-complete-allow-free-form-text"] .auto-complete-options ul li:nth-child(1)')
      .assert.val('[data-id="auto-complete-allow-free-form-text"] .display', 'freeform', 'display input should be set to the display value of the input')
      .assert.val('[data-id="auto-complete-allow-free-form-text"] input[type="hidden"]', 'freeform', "hidden input should be set to the value of the input")
    .done();
  }
}