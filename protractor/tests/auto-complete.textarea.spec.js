describe('auto complete (textarea)', function() {
  before(function() {
    this.genericPage = require('../lib/page/generic');
    this.getTextarea = true;
  });

  require('./shared-tests/auto-complete')();
});