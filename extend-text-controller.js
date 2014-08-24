angular.module('nag.extendText')
.controller('NagExtendTextDCtrl', [
  '$scope',
  '$sce',
  'nagBeat',
  'nagDefaults',
  function($scope, $sce, nagBeat, nagDefaults) {
    /**
     * Beat name
     *
     * @ngdirectivescontroller
     * @type string
     * @property beatName
     */
    this.beatName = 'extend-text-' + $scope.$id;

    /**
     * Converts an array of strings to an array of objects that can be for the auto complete options
     *
     * @ngdirectivecontroller
     * @method objectizeData
     *
     * @param {string[]|object[]} data An array of string values
     *
     * @returns {object[]} An array of objects
     */
    this.objectizeData = function(data) {
      var newData;

      if(_.isArray(data) && data.length > 0) {
        if(!_.isObject(data[0])) {
          newData = [];

          data.forEach(function(value) {
            newData.push({
              display: value,
              value: value
            });
          });

          data = newData;
        }
      }

      return data;
    };

    /**
     * Set the loading indicator value
     *
     * @ngdirectivecontroller
     * @method setLoadingIndicator
     *
     * @param {boolean} isActive What to set loading indicator to
     */
    this.setLoadingIndicator = function(isActive) {
      isActive = (isActive === true) ? true : false;
      $scope.options.autoCompleteOptions.loadingData = isActive;
    };

    /**
     * Set the new indictor value
     *
     * @ngdirectivecontroller
     * @method setNewIndicator
     *
     * @param {boolean} isNew What to set new indicator to
     */
    this.setNewIndicator = function(isNew) {
      isNew = (isNew === true) ? true : false;
      $scope.options.autoCompleteOptions.isNew = isNew;
    };

    /**
     * Filter data
     *
     * @ngdirectivecontroller
     * @method filter
     *
     * @param {string[]|object[]} data
     * @param {string} [filterValue] Value to filter data by (default to the value in the input)
     *
     * @returns {object[]} Returns that data that passes the filtering
     */
    this.filter = function(data, filterValue) {
      filterValue = (filterValue || filterValue === '') ? filterValue : $scope.getTextAreaValue();
      return $scope.options.autoCompleteOptions.filter(this.objectizeData(data), filterValue);
    };

    /**
     * Add a value to the data set
     *
     * @ngdirectivecontroller
     * @method addValue
     *
     * @param {mixed} display Display value
     * @param {mixed} value Stored value
     */
    this.addValue = function(display, value) {
      if($scope.options.tagOptions.allowDuplicates === true || utilities.getKeyByPropertyValue($scope.options.data, 'value', value) === -1) {
        $scope.options.data.push({
          display: display,
          value: value
        });
      }
    };

    /**
     * Process data for auto complete
     *
     * @ngdirectivecontroller
     * @method processData
     *
     * @param {object[]} data Auto complete data
     */
    this.processData = function(data) {
      if(_.isArray(data)) {
        $scope.options.autoCompleteOptions.options = data;

        if(data.length == 0 || _.map(data, function(option){return option.display;}).indexOf($scope.getVisibleValue()) == -1) {
          $scope.options.autoCompleteOptions.isNew = true;
        } else {
          $scope.options.autoCompleteOptions.isNew = false;
        }
      } else {
        $scope.options.autoCompleteOptions.isNew = true;
      }
    };

    /**
     * Reset auto complete options
     *
     * @ngdirectivecontroller
     * @method resetAutoCompleteOptions
     */
    this.resetAutoCompleteOptions = function() {
      var defaultOptions;
      defaultOptions = this.defaultAutoCompleteOptions;

      $scope.options.autoCompleteOptions.options = defaultOptions;
      $scope.options.autoCompleteOptions.variableCache = null;
      $scope.options.autoCompleteOptions.selectedOptionIndex = 0;
    };

    /**
     * Overwrite the current data set with new values
     *
     * @ngdirectivecontroller
     * @method setValue
     *
     * @param {mixed} display Display value
     * @param {mixed} value Stored value
     */
    this.setValue = function(display, value) {
      $scope.options.data = [{
        display: display,
        value: value
      }];
      $scope.positionCursor();
    };

    /**
     * Displays the auto complete options
     *
     * @ngdirectivecontroller
     * @method displayAutoComplete
     *
     * @param {boolean} [resetSelection=false] Whether or not to reset the selected auto complete item
     */
    this.displayAutoComplete = function(resetSelection) {
      if($scope.options.autoCompleteOptions.display === false) {
        //need to make sure the auto complete is properly positioned
        $scope.updateAutoCompletePosition();

        $scope.options.autoCompleteOptions.variableCache = null;
        $scope.options.autoCompleteOptions.display = true;
      }

      if(resetSelection === true) {
        $scope.options.autoCompleteOptions.selectedOptionIndex = 0;
      }
    };

    /**
     * Hide the auto complete options
     *
     * @ngdirectivecontroller
     * @method hideAutoComplete
     */
    this.hideAutoComplete = function() {
      //if we are hiding the auto complete, no need to perform any outstanding request for data
      nagBeat.remove(this.beatName);
      $scope.options.autoCompleteOptions.isNew = false;
      $scope.options.autoCompleteOptions.variableCache = null;
      $scope.options.autoCompleteOptions.display = false;
    };

    var parsingHelper = {
      lastValidatedQuery: null,
      lastHelpMessage: null,
      hasQueryChanged: function() {
        return parsingHelper.lastValidatedQuery !== $scope.getHiddenValue();
      },
      generateHelpMessage: function() {
        var message = '';

        if($scope.getHiddenValue().length === 0) {
          message = 'No query entered';
        } else if($scope.parsingValidation === true) {
          message = 'Valid query entered';
        } else {
          var characterNumber = $scope.parsingValidation.characterNumber;

          if($scope.parsingValidation.queryLocation.substr(0, 3) === '...') {
            characterNumber += ($scope.getHiddenValue().lastIndexOf($scope.parsingValidation.queryLocation.substr(3).trim()) - 3);
          }

          message = 'Error on line ' + $scope.parsingValidation.lineNumber + ' at character ' + characterNumber;
        }

        parsingHelper.lastHelpMessage = message;
      }
    };

    /**
     * Stores that validation result for the parsing
     *
     * @ngscope
     * @type {boolean}
     * @property parsingValidation
     */
    $scope.parsingValidation = true;

    /**
     * Validate the data against the parsing parser
     *
     * @ngscope
     * @method validateParsing
     */
    $scope.validateParsing = function() {
      //PERFORMANCE: since we call this method internally, we want to make sure not to run validation logic if the last validated query has not changed
      if(parsingHelper.hasQueryChanged()) {
        $scope.parsingValidation = $scope.options.parsingOptions.parser.validate($scope.getHiddenValue());
        parsingHelper.lastValidatedQuery = $scope.getHiddenValue();
        parsingHelper.generateHelpMessage();
      }
    };

    /**
     * Return the help message for the for the current validation error
     *
     * @returns {string} Return the help message for the for the current validation error
     */
    $scope.getParsingHelpMessage = function() {
      return $sce.trustAsHtml(parsingHelper.lastHelpMessage);
    };

    /**
     * Unregisters the form reset event
     *
     * @ngscope
     * @property unregisterResetFormEvent
     * @type function
     */
    $scope.unregisterResetFormEvent = null;

    /**
     * Unregisters the set data event
     *
     * @ngscope
     * @property unregisterSetDataEvent
     * @type function
     */
    $scope.unregisterSetDataEvent = null;

    /**
     * Sets the model controller
     *
     * @ngdirectivecontroller
     * @method setModelController
     *
     * @param {object} modelController Model controller
     */
    this.setModelController = function(modelController) {
      $scope.modelController = modelController;
    };

    //un-register callback on destruction
    $scope.$on('$destroy', function() {
      if($scope.unregisterResetFormEvent) {
        $scope.unregisterResetFormEvent();
      }

      if($scope.unregisterSetDataEvent) {
        $scope.unregisterSetDataEvent();
      }
    });
  }
]);
