module.exports = {
  name: 'extend text',

  //todo: implement
  'should reset properly when form reset event is triggered': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.val('[data-ut="auto-complete-reset-first-name"] .display', 'John', 'has value')
      .assert.val('[data-ut="auto-complete-reset-first-name"] input[type="hidden"]', 'John', 'has value')
      .assert.val('[data-ut="auto-complete-reset-last-name"] .display', 'Doe', 'has value')
      .assert.val('[data-ut="auto-complete-reset-last-name"] input[type="hidden"]', 'Doe', 'has value')
    .click('[data-ut="reset-extend-text-resettable"]')
      .assert.val('[data-ut="auto-complete-reset-first-name"] .display', '', 'value reset')
      .assert.val('[data-ut="auto-complete-reset-first-name"] input[type="hidden"]', '', 'value reset')
      .assert.val('[data-ut="auto-complete-reset-last-name"] .display', '', 'value reset')
      .assert.val('[data-ut="auto-complete-reset-last-name"] input[type="hidden"]', '', 'value reset')
    .done();
  }
};