describe('tagging (text input)', function() {
  before(function() {
    this.genericPage = require('../lib/page/generic');
    this.getTextarea = false;
  });

  require('./shared-tests/tagging')();
});