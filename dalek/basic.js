
module.exports = {
  name: 'extend text component',
  //tests: {
    'should build basic DOM structure': function(test) {
      test.open('http://localhost:3000/empty-config')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
        .assert.exists('[data-id="test"] .container', 'Container for extend text data')
        .assert.exists('[data-id="test"] .container .inputs', 'Container for the input elements')
        .assert.exists('[data-id="test"] .container .inputs .display', 'The display input the user interacts with')
        .assert.exists('[data-id="test"] .container .inputs input[type="hidden"]', 'The hidden input that is generally used when processing the form')
      .done();
    },

    'should keep display and hidden input in sync with empty configuration': function(test) {
      test.open('http://localhost:3000/empty-config')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'test')
        .assert.val('.display', 'test', 'Entered text into display input')
        .assert.val('input[type="hidden"]', 'test', "Hidden input has been updated based on text inserted into the display input")
      .done();
    },

    //todo: figure out how to test that an element is focus
    'should work well with the auto focus component': function(test) {
      test.open('http://localhost:3000/empty-config-with-auto-focus')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
        //.assert.attr('.display', 'focus', true) : todo : figure out how to select active component
      .done();
    },

    //todo: figure out how to send special keys
    'should be able to configure that text gets selected when input is focused': function(test) {
      test.open('http://localhost:3000/select-on-focus')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'test')
      .click('.display')
      //todo: figure out how to send special character to input (back space in this case)
        //.assert.attr('.display', 'value', '')
      .done();
    },

    'should be able to configure that the form submit when hitting enter on none tagging element': function(test) {
      test.open('http://localhost:3000/allow-submit-on-enter')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .type('.display', 'test')
      //todo: figure out how to send special character to input (enter in this case)
        //.assert.url('http://localhost:3000/allow-submit-on-enter?testDisplay=Test&test=Test', 'URL has the form data in it')
      .done();
    },

    'should be able to configure the initial value': function(test) {
      test.open('http://localhost:3000/set-data-in-config')
      //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
        .assert.val('.display', 'Configuration', 'Display input defaults to configured value')
        .assert.val('input[type="hidden"]', 'config', "Hidden input defaults to configured value")
      .done();
    }
  //}
};