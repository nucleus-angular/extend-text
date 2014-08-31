describe('auto complete (text input)', function() {
  before(function() {
    this.genericPage = require('../lib/page/generic');
    this.getTextarea = false;
  });

  require('./shared-tests/auto-complete')();
});