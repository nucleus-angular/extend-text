var _ = require('lodash');

module.exports = function(name, tests, includeTextareaTests) {
  includeTextareaTests = includeTextareaTests === false ? false : true;
  var dalekTests = {
    name: name
  };

  _.forEach(tests, function(testFunction, testName) {
    //input test
    dalekTests[testName] = function(test) {
      testFunction(test);
    };

    //textarea test
    if(includeTextareaTests === true) {
      dalekTests[testName + ' (textarea)'] = function(test) {
        testFunction(test, 'textarea');
      };
    }
  });

  return dalekTests;
};