module.exports = {
  name: 'extend text with tagging enabled',
  tests: {
    'should build basic DOM structure': function(test) {
      test.open('http://localhost:3000/tagging')
        //angular - need to wait for angular to render this container
      .waitForElement('[data-id="test"] .container')
      .assert.exists('[data-id="test"] .container', 'Container for extend text data')
      .assert.exists('[data-id="test"] .container .inputs', 'Container for the input elements')
      .assert.exists('[data-id="test"] .container .inputs .display', 'The display input the user interacts with')
      .assert.exists('[data-id="test"] .container .inputs input[type="hidden"]', 'The hidden input that is generally used when processing the form')
      .done();
    }
  }
};