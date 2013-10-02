module.exports = {
  name: 'extend text component with auto complete enabled',
  //tests: {
    'should be able to get a list of auto complete options': function(test) {
      test.open('http://localhost:3000/auto-complete-load-options')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'tes')
      //angular - need to wait for angular to render this container
      .waitForElement('.auto-complete-options ul li:nth-child(5)')
      //todo: figure out why numberOfVisibleElements equates to 4 instead of 5
        //.assert.numberOfVisibleElements('.auto-complete-options ul li', 5, 'auto complete should have 5 options available')
        .assert.numberOfElements('.auto-complete-options ul li', 5, 'auto complete should have 5 options available')
      .done();
    },

    'should not load auto complete options until the load character count has been reached': function(test) {
      test.open('http://localhost:3000/auto-complete-load-character-count')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'tes')
      //todo: need to wait for the wait() method to be fixed
      //.wait(1000)
        .assert.doesntExist('auto-complete-options ul li', 'auto complete options should not be visible until 3 character have been insert in the input')
      .type('.display', 'tes')
      //angular - need to wait for angular to render this container
      .waitForElement('.auto-complete-options ul li:nth-child(5')
      //todo: figure out why numberOfVisibleElements equates to 4 instead of 5
      //.assert.numberOfVisibleElements('.auto-complete-options ul li', 5, 'auto complete should have 5 options available')
        .assert.numberOfElements('.auto-complete-options ul li', 5, 'auto complete should have 5 options available')
      .done();
    },

    'should properly set the display value for the auto complete options': function(test) {
      test.open('http://localhost:3000/auto-complete-load-options-display-value')
       //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'tes')
      //angular - need to wait for angular to render this container
      .waitForElement('.auto-complete-options ul li:nth-child(5)')
        .assert.chain()
          .numberOfElements('.auto-complete-options ul li', 5, 'auto complete should have 5 options available')
          .text('.auto-complete-options ul li:nth-child(1)', 'test1', 'auto complete options should have proper display value')
          .text('.auto-complete-options ul li:nth-child(2)', 'test2', 'auto complete options should have proper display value')
          .text('.auto-complete-options ul li:nth-child(3)', 'test3', 'auto complete options should have proper display value')
          .text('.auto-complete-options ul li:nth-child(4)', 'test4', 'auto complete options should have proper display value')
          .text('.auto-complete-options ul li:nth-child(5)', 'test5', 'auto complete options should have proper display value')
        .end()
      .done();
    },

    'should properly set the data-value attribute for the auto complete options': function(test) {
      test.open('http://localhost:3000/auto-complete-load-options-attribute-value')
       //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'tes')
      //angular - need to wait for angular to render this container
      .waitForElement('.auto-complete-options ul li:nth-child(5)')
        .assert.chain()
          .numberOfElements('.auto-complete-options ul li', 5, 'auto complete should have 5 options available')
          .attr('.auto-complete-options ul li:nth-child(1)', 'data-value', 1, 'auto complete options should have proper attribute value')
          .attr('.auto-complete-options ul li:nth-child(2)', 'data-value', 2, 'auto complete options should have proper attribute value')
          .attr('.auto-complete-options ul li:nth-child(3)', 'data-value', 3, 'auto complete options should have proper attribute value')
          .attr('.auto-complete-options ul li:nth-child(4)', 'data-value', 4, 'auto complete options should have proper attribute value')
          .attr('.auto-complete-options ul li:nth-child(5)', 'data-value', 5, 'auto complete options should have proper attribute value')
        .end()
      .done();
    },

    'should not allow free form data by default': function(test) {
      test.open('http://localhost:3000/auto-complete-no-free-form-text')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'testa')
      .click('body')
        .assert.chain()
          .val('.display', '', 'display input should be empty when clicking outside of the input and no option is selected')
          .val('input[type="hidden"]', '', "hidden input should be empty when clicking outside of the input and no option is selected")
        .end()
      .done();
    },

    'should be able to define a custom response parser': function(test) {
      test.open('http://localhost:3000/auto-complete-custom-response-parser')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'use')
      //angular - need to wait for angular to render this container
      .waitForElement('.auto-complete-options ul li:nth-child(5)')
        .assert.chain()
          .numberOfElements('.auto-complete-options ul li', 5, 'auto complete should have 5 options available')
          .query('.auto-complete-options ul li:nth-child(1)')
            .text('user1', 'auto complete options should have proper display value')
            .attr('data-value', 1, 'auto complete options should have proper attribute value')
          .end()
        .end()
      .done();
    },

    'should be able to define a custom variable name': function(test) {
      test.open('http://localhost:3000/auto-complete-custom-variable-name')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'varname')
      //angular - need to wait for angular to render this container
      .waitForElement('.auto-complete-options ul li:nth-child(2)')
        .assert.chain()
          .numberOfElements('.auto-complete-options ul li', 2, 'auto complete should have 5 options available')
          .query('.auto-complete-options ul li:nth-child(1)')
            .text('varname1', 'auto complete options should have proper display value')
            .attr('data-value', 1, 'auto complete options should have proper attribute value')
          .end()
        .end()
      .done();
    },

    'should be able to define a custom variable formatter': function(test) {
      test.open('http://localhost:3000/auto-complete-custom-variable-format')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'varformat')
      //angular - need to wait for angular to render this container
      .waitForElement('.auto-complete-options ul li:nth-child(2)')
        .assert.chain()
          .numberOfElements('.auto-complete-options ul li', 2, 'auto complete should have 5 options available')
          .query('.auto-complete-options ul li:nth-child(1)')
            .text('varformat1', 'auto complete options should have proper display value')
            .attr('data-value', 1, 'auto complete options should have proper attribute value')
          .end()
        .end()
      .done();
    },

    'should be able to define the method used for retriving the data': function(test) {
      test.open('http://localhost:3000/auto-complete-post-data')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'tes')
      //angular - need to wait for angular to render this container
      .waitForElement('.auto-complete-options ul li:nth-child(2)')
        .assert.chain()
          .numberOfElements('.auto-complete-options ul li', 2, 'auto complete should have 5 options available')
          .query('.auto-complete-options ul li:nth-child(1)')
            .text('test1', 'auto complete options should have proper display value')
            .attr('data-value', 1, 'auto complete options should have proper attribute value')
          .end()
        .end()
      .done();
    },

    'should be able to define a custom url generator': function(test) {
      test.open('http://localhost:3000/auto-complete-custom-url-generator')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'url')
      //angular - need to wait for angular to render this container
      .waitForElement('.auto-complete-options ul li:nth-child(2)')
        .assert.chain()
          .numberOfElements('.auto-complete-options ul li', 2, 'auto complete should have 5 options available')
          .query('.auto-complete-options ul li:nth-child(1)')
            .text('urlgen1', 'auto complete options should have proper display value')
            .attr('data-value', 1, 'auto complete options should have proper attribute value')
          .end()
        .end()
      .done();
    },

    'should not attempt to pul data until that search deley time have been reached': function(test) {
      test.open('http://localhost:3000/auto-complete-search-delay')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'searchdelay')
      //todo: when imlemented
      //.wait(200)
        //todo: question figure out if it is possible to make sure an element does not exist and not have it wait any amount of time
        //.assert.doesntExist('auto-complete-options ul li', 'auto complete options should not be visible until search delay time has been exceeded')
      //todo: when imlemented
      //the auto complete options should now be visible
      //.wait(200)
        /*.assert.chain()
          .numberOfElements('.auto-complete-options ul li', 2, 'auto complete should have 5 options available')
          .query('.auto-complete-options ul li:nth-child(1)')
            .text('searchdelay1', 'auto complete options should have proper display value')
            .attr('data-value', 1, 'auto complete options should have proper attribute value')
          .end()
        .end()*/
      .done();
    },

    'should select first item in auto complete options list': function(test) {
      test.open('http://localhost:3000/auto-complete-load-options')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'tes')
      //angular - need to wait for angular to render this container
      .waitForElement('.auto-complete-options ul li:nth-child(5)')
      //todo: wait for wait() implementation to be fixed
      //.wait(50)
      .assert.doesntExist('auto-complete-options ul li', 'debug')
        .assert.attr('.auto-complete-options ul li:nth-child(1)', 'class').to.contain('is-focus', 'has focused class')
      .done();
    },

    'should select items when bluring input': function(test) {
      test.open('http://localhost:3000/auto-complete-select-on-blur')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'selectblur')
      //angular - need to wait for angular to render this container
      .waitForElement('.auto-complete-options ul li:nth-child(2)')
      //todo: wait for wait() implementation to be fixed
      //.wait(50)
      //todo: remove when wait() is fixed
      .assert.doesntExist('auto-complete-opasdtions ul li', 'debug')
      .click('body')
        .assert.val('.display', 'selectblur1', 'display input should be set to the display value of the first option')
        .assert.val('input[type="hidden"]', '1', "hidden input should be set to thevalue of the data-value attribute of the first option")
      .done();
    },

    'should allow free form text should have single option': function(test) {
      test.open('http://localhost:3000/auto-complete-allow-free-form-text')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'freeform')
      //angular - need to wait for angular to render this container
      .waitForElement('.auto-complete-options ul li:nth-child(1)')
        .assert.numberOfElements('.auto-complete-options ul li', 1, 'should have 1 option')
        .assert.text('.auto-complete-options ul li', 'freeform', 'display value of auto complete option should be same of user input')
        .assert.text('.auto-complete-options ul li', 'freeform', 'attribute data-value value of auto complete option should be same of user input')
      .done();
    }
  //}
}