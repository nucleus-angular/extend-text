/**
 * # Nucleus Angalar Extend Text
 *
 * The extend text component allows you to extend a text box input field with additional functionality.
 *
 * ## Basic Functionality
 *
 * TBD
 *
 * ## Auto Complete
 *
 * TBD
 *
 * ## Tagging
 *
 * TBD
 *
 * @module nag.extendText
 * @ngdirective nagExtendText
 *
 * @nghtmlattribute {object} nag-extend-text Tells AngularJS this element is an extend text component and the passed object overwrite default for $scope.options
 * @nghtmlattribute {object} data-model Data model to use for this component
 */
angular.module('nag.extendText', [
  'nag.core',
  'nag.beat',
  'nag.event',
  'nag.form.input'
])
.config([
  'nagDefaultsProvider',
  function(nagDefaultsProvider) {
    /**
     * Options
     *
     * @ngscope
     * @property {object} options
     *   @property {string} [rootTemplatePath=rootTemplatePath+'/nucleus-angular-extend-text/assets/templates'] Root path for templates
     *   @property {boolean} [selectOnFocus=false] Whether or not to select of data when focusing on input
     *   @property {boolean} [preventSubmitOnEnter=true] Whether or not the prevent form submission on the enter key when input focused
     *   @property {array} [data] The data for the input
     *   @property {string} [templateUrl="extend-text.html"] Main template url
     *   @property {string} [template=""] Template HTML
     */
    nagDefaultsProvider.setOptions('extendText', {
      rootTemplatePath: nagDefaultsProvider.getRootTemplatePath() + '/nucleus-angular-extend-text/assets/templates',
      selectOnFocus: false, //whether or not to select the existing text in the input when focusing
      preventSubmitOnEnter: true,
      data: [],
      templateUrl: 'extend-text.html',
      template: null
    });

    /**
     * Tagging Options
     *
     * @ngscope
     * @property {object} options.tagOptions
     *   @property {string} [rootTemplatePath=rootTemplatePath+'/nucleus-angular-extend-text/assets/templates'] Root path for templates
     *   @property {boolean} [enabled=false] Whether or not tagging is enabled
     *   @property {boolean} [allowDuplicates=false] Whether or not to allow duplicate values
     *   @property {number} [enabled=null] The index (zero-based) or the currently selected name
     *   @property {boolean} [doubleClickEdit=false] Whether or not to enable tag editing on double click
     */
    nagDefaultsProvider.setOptions('extendTextTagOptions', {
      rootTemplatePath: nagDefaultsProvider.getRootTemplatePath() + '/nucleus-angular-extend-text/assets/templates',
      enabled: false,
      allowDuplicates: false,
      selectedTagIndex: null,
      doubleClickEdit: false
    });

    /**
     * Auto Complete Options
     *
     * @ngscope
     * @property {object} options.autoCompleteOptions
     *   @property {string} [rootTemplatePath=rootTemplatePath+'/nucleus-angular-extend-text/assets/templates']
     *   Root path for templates
     *   @property {boolean} [enabled=false] Whether or not auto complete functionality is enabled
     *   @property {boolean} [display=false] Whether or not the auto complete is currently being displayed
     *   @property {string} [url=null] Base url for where the auto complete data is retrieved from from
     *   @property {string} [variable="input"] Variable name to use in the query string when retrieving the auto complete data
     *   @property {string} [variableCache=null]
     *   The last value sent when retrieving the auto complete data in order to prevent duplicate requests for the same data
     *   @property {number} [loadCharacterCount=3]
     *   Number of character needed to be enter before attempting to retrieve data for the auto complete from a remote source
     *   @property {number} [searchDelay=350]
     *   Number of milliseconds to wait from last key entered to search for data to prevent unnecessary request if the user was not done typing there search
     *   @property {string} [source="remote"]
     *   Where the data is being pulled from, right now it can be:
     *   * remote: The data is being loaded from a remote source
     *   * local: The data is being loaded locally (from whatever is in localData)
     *   @property {array} [localData] Data used when source is "local"
     *   @property {array} [options] Current set of auto complete options being displayed
     *   @property {number} [selectedOptionIndex=0] Index (zero-based) or the currently selected option
     *   @property {boolean} [selectOnBlur=true] Selected the currently higlighted option when blurring on the input
     *   @property {boolean} [allowFreeForm=false]
     *   Allow the user to enter in free form text (does not have to match something in the auto complete)
     *   @property {function} [generateDataUrl]
     *   Generate the URL used to retrieve the auto complete data form the remote service
     *   @property {string} [remoteDataMethod="GET"] HTTP method to use when requesting data from the remote service
     *   @property {boolean} [loadingData=false] Whether or not to display the loaded data message
     *   @property {function} [responseParser] Function to parse the response when retrieving the auto complete data
     *   @property {function} [formatVariable] Function used to format the variable when generating the URL
     *   @property {function} [filter] Function to use to filter the data when cache is set to true
     */
    nagDefaultsProvider.setOptions('extendTextAutoCompleteOptions', {
      rootTemplatePath: nagDefaultsProvider.getRootTemplatePath() + '/nucleus-angular-extend-text/assets/templates',
      enabled: false,
      display: false,
      url: null,
      variable: 'input',
      variableCache: null,
      loadCharacterCount: 3,
      searchDelay: 350,
      source: 'remote',
      localData: [],
      options: [],
      selectedOptionIndex: 0,
      selectOnBlur: false,
      allowFreeForm: false,
      newText: 'New',
      isNew: false,
      generateDataUrl: function() {
        var url = this.options.autoCompleteOptions.url;
        var variableValue = this.getTextAreaValue();
        this.options.autoCompleteOptions.variableCache = this.getTextAreaValue();
        url += (url.indexOf('?') === -1 ? '?' : '&');
        url += this.options.autoCompleteOptions.variable + '=' + this.options.autoCompleteOptions.formatVariable(variableValue);

        if(this.options.autoCompleteOptions.remoteDataMethod === 'JSONP') {
          url += '&callback=JSON_CALLBACK';
        }

        return url;
      },
      remoteDataMethod: 'GET',
      loadingData: false,
      responseParser: function(response) {
        var parsedData, x;
        parsedData = [];

        for(x = 0; x < response.length; x += 1) {
          parsedData.push({
            display: response[x].display,
            value: response[x].value
          });
        }

        return parsedData;
      },
      formatVariable: function(variable) {
        return variable;
      },
      filter: function(data, filter){
        return _.filter(data, function(item) {
          return item.display.indexOf(filter) !== -1;
        });
      }
    });

    nagDefaultsProvider.setOptionsGetter('extendTextTest', function(options) {
      var extendTextDefaults = nagDefaultsProvider.getOptions('extendText');
      var extendTextTagDefaults = nagDefaultsProvider.getOptions('extendTextTagOptions');
      var extendTextAutoCompleteDefaults = nagDefaultsProvider.getOptions('extendTextAutoCompleteOptions');

      var results = angular.extend(extendTextDefaults, options);

      if(results.tagOptions) {
        results.tagOptions = angular.extend(extendTextTagDefaults, results.tagOptions);
      } else {
        results.tagOptions = extendTextTagDefaults
      }

      if(results.autoCompleteOptions) {
        results.autoCompleteOptions = angular.extend(extendTextAutoCompleteDefaults, results.autoCompleteOptions);
      } else {
        results.autoCompleteOptions = extendTextAutoCompleteDefaults
      }

      return results;
    })
  }
])
.directive('nagExtendText', [
  '$timeout',
  '$http',
  'nagBeat',
  '$compile',
  'nagHelper',
  'nagDefaults',
  'noneAffectingTextKeys',
  '$rootScope',
  function($timeout, $http, nagBeat, $compile, nagHelper, nagDefaults, noneAffectingTextKeys, $rootScope){
    return {
      restrict: 'A',
      scope: {
        options: '=?nagExtendText',
        model: '=dataModel'
      },
      require: [
        '^?nagResettableForm'
      ],
      controller: [
        '$scope',
        function($scope) {
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
          }

          //unregister callback on destructure
          $scope.$on('$destroy', function() {
            if($scope.unregisterResetFormEvent) {
              $scope.unregisterResetFormEvent();
            }

            if($scope.unregisterSetDataEvent) {
              $scope.unregisterSetDataEvent();
            }
          });
        }
      ],
      templateUrl: function(){
        return nagDefaults.getRootTemplatePath() + '/nucleus-angular-extend-text/assets/templates/extend-text.html';
      },
      transclude: true,
      compile: function(element, attributes, transclude) {
        if(!attributes.id) {
          throw new Error("Must provide data-id attribute for extend text");
        }

        element.addClass('extend-text');
        return {
          post: function(scope, element, attributes, controllers) {
            transclude(scope, function(clone) {
              var displayElement = clone.filter('input.display');
              var hiddenElement = clone.filter('input[type="hidden"]');

              displayElement.attr('ng-class', "{'ng-valid': modelController.$dirty && modelController.$valid, 'ng-invalid': modelController.$dirty && modelController.$invalid}")
              .attr('nag-event', "{keydown: 'keyDown($event)', keyup: 'keyUp($event)', blur: 'blur($event)', focus: 'focus($event)'}")
              .attr('ng-mouseup', "mouseUp($event)")
              .attr('value', "{{ getVisibleValue() }}");

              element.find('.inputs').append($compile(displayElement)(scope)).append(hiddenElement);

              displayElement = null;
              hiddenElement = null;
            });

            scope.options = nagDefaults.getOptions('extendTextTest', scope.options);
            var defaultAutoCompleteOptions = _.clone(scope.options.autoCompleteOptions.options);
            var beatName = 'extend-text-' + scope.$id;
            var addValue, setValue, updateTextAreaPadding, updateAutoCompletePosition, displayAutoComplete, hideAutoComplete, setElementHeight, getData, originalPadding, borderSize, originalMargin, resetAutoCompleteOptions, setDisplayInput, dataUpdate, dontFocusOnCursorPlacement;
            dontFocusOnCursorPlacement = false;

            //todo: research: not sure why but I need to have the $timeout here for this to properly be able to pull the original padding
            $timeout(function() {
              originalPadding = {
                left: parseInt($(element).find('input.display').css('paddingLeft'), 10),
                top: parseInt($(element).find('input.display').css('paddingTop'), 10)
              };
              borderSize = {
                top: parseInt($(element).find('input.display').css('borderTopWidth'), 10),
                left: parseInt($(element).find('input.display').css('borderLeftWidth'), 10)
              };
              originalMargin = {
                top: parseInt($(element).find('input.display').css('marginTop'), 10),
                left: parseInt($(element).find('input.display').css('marginLeft'), 10)
              };

              //todo: research: the -1 is to account for the border the tag has because I am not sure how to handle that programmatically (attribute value???)
              //todo: if someone where remove the border or make it thicker, this would have to change
              element.find('.tag-container').css({
                top: originalPadding.top + borderSize.top + originalMargin.top - 1,
                left: originalPadding.left + borderSize.left + originalMargin.left - 1
              });
            }, 0);

            addValue = function(display, value) {
              if(scope.options.tagOptions.allowDuplicates === true || utilities.getKeyByPropertyValue(scope.options.data, 'value', value) === -1) {
                scope.options.data.push({
                  display: display,
                  value: value
                });
              }
            };

            setValue = function(display, value) {
              scope.options.data = [{
                display: display,
                value: value
              }];
            };

            updateTextAreaPadding = function() {
              if($(element).find('.tag:last-child').length > 0) {
                var position = $(element).find('.tag:last-child').position();
                var tagWidth = $(element).find('.tag:last-child').outerWidth(true);
                var positionTop = position.top < originalPadding.top ? originalPadding.top : position.top + originalPadding.top;
                $(element).find('input.display').css('paddingLeft', position.left + tagWidth + originalPadding.left);
                $(element).find('input.display').css('paddingTop', positionTop);
              } else {
                $(element).find('input.display').css('paddingLeft', originalPadding.left);
                $(element).find('input.display').css('paddingTop', originalPadding.top);
              }
            };

            updateAutoCompletePosition = function() {
              var elementPosition = $(element).find('input.display').position();
              var elementHeight = $(element).find('input.display').outerHeight();
              var elementWidth = $(element).find('input.display').outerWidth();
              var top = parseInt(elementPosition.top + elementHeight + originalMargin.top, 10);
              var left = parseInt(elementPosition.left, 10);

              $(element).find('.auto-complete-options').css({
                'top': top ,
                'left': left,
                'width': elementWidth
              });
            };

            displayAutoComplete = function(resetSelection) {
              if(scope.options.autoCompleteOptions.display === false) {
                //need to make sure the auto complete is properly positioned
                updateAutoCompletePosition();

                scope.options.autoCompleteOptions.variableCache = null;
                scope.options.autoCompleteOptions.display = true;
              }

              if(resetSelection === true) {
                scope.options.autoCompleteOptions.selectedOptionIndex = 0;
              }
            };

            hideAutoComplete = function() {
              //if we are hiding the auto complete, no need to perform any outstanding request for data
              nagBeat.remove(beatName);
              scope.options.autoCompleteOptions.variableCache = null;
              scope.options.autoCompleteOptions.display = false;
            };

            setElementHeight = function() {
              var elementHeight = $(element).find('input.display').outerHeight();

              $(element).css({
                'minHeight': elementHeight
              });
            };

            getData = function() {
              var processData = function(data) {
                if(_.isArray(data)) {
                  scope.options.autoCompleteOptions.options = data;

                  if(data.length == 0 || _.map(data, function(option){return option.display;}).indexOf(scope.getVisibleValue()) == -1) {
                    scope.options.autoCompleteOptions.isNew = true;
                  } else {
                    scope.options.autoCompleteOptions.isNew = false;
                  }
                } else {
                  scope.options.autoCompleteOptions.isNew = true;
                }
              };

              var textAreaValue = $(element).find('input.display').val();

              if(scope.options.autoCompleteOptions.source === 'local') {
                var data = textAreaValue.length > 0
                ? scope.options.autoCompleteOptions.filter(scope.options.autoCompleteOptions.localData, textAreaValue)
                : scope.options.autoCompleteOptions.localData;
                
                processData(data);
                scope.options.autoCompleteOptions.loadingData = false;
              } else if(textAreaValue != scope.options.autoCompleteOptions.variableCache) {
                var url = scope.options.autoCompleteOptions.generateDataUrl.apply(scope, []);
                scope.options.autoCompleteOptions.loadingData = true;

                $http({method: scope.options.autoCompleteOptions.remoteDataMethod, url: url}).
                success(function(response, status, headers, config) {
                  if(angular.isObject(response)) {
                    processData(scope.options.autoCompleteOptions.responseParser(response));
                  }

                  scope.options.autoCompleteOptions.loadingData = false;
                }).
                error(function(data, status, headers, config) {
                  scope.options.autoCompleteOptions.loadingData = false;
                  //todo: proper error handling
                });
              }
            };

            resetAutoCompleteOptions = function() {
              var defaultOptions;
              defaultOptions = defaultAutoCompleteOptions;

              /*if(scope.options.autoCompleteOptions.allowFreeForm && scope.getVisibleValue() != '') {
                defaultOptions = [{
                  display: scope.getNewItemValue(),
                  value: scope.getVisibleValue()
                }];
              }*/

              scope.options.autoCompleteOptions.options = defaultOptions;
              scope.options.autoCompleteOptions.variableCache = null;
              scope.options.autoCompleteOptions.selectedOptionIndex = 0;
            };

            setDisplayInput = function(value) {
              var currentPosition = $(element).find('input.display')[0].selectionStart;
              var positionCursor = (currentPosition < $(element).find('input.display').val().length);
              $(element).find('input.display').val(value)

              //if positionCursor is zero all browser except IE won't do anything but IE will focus the element which is not desired effect
              //so we need something additional to track whether or not the auto focus the element
              if(positionCursor && !dontFocusOnCursorPlacement) {
                $(element).find('input.display')[0].setSelectionRange(currentPosition, currentPosition);
              }

              dontFocusOnCursorPlacement = false;
            };

            dataUpdate = function() {
              var hiddenValue = scope.getHiddenValue();
              element.find('input[type="hidden"]').val(scope.getHiddenValue());
              setDisplayInput(scope.getVisibleValue());

              if(hiddenValue != '') {
                scope.modelController.$setViewValue(scope.getHiddenValue());
              }
            };

            /**
             * Whether or not it is active
             *
             * @ngscope
             * @property {boolean} isActive
             */
            scope.isActive = false;

            /**
             * Add or set a new value for the input
             *
             * @ngscope
             * @method newValue
             *
             * @param {mixed} display The value displayed to the user
             * @param {mixed} [value=display] The value used for the hidden field (which might or might not differ from the display value)
             */
            scope.newValue = function(display, value) {
              value = value || display;

              if(scope.options.tagOptions.enabled === true && value === '') {
                return;
              }

              if(scope.options.tagOptions.enabled === true) {
                addValue(display, value);
                setDisplayInput('');
              } else {
                setValue(display, value);
                //setDisplayInput(display, true);
              }
            };

            /**
             * Clear out the current input values
             *
             * @ngscope
             * @method resetAutoCompleteValues
             *
             * @param {boolean} [clearDataValues=false] Whether or not to clear out the display value too
             */
            scope.resetAutoCompleteValues = function(clearDataValues) {
              if(clearDataValues === true) {
                setDisplayInput('');
                scope.options.data = [];
              }

              resetAutoCompleteOptions();
            }

            /**
             * Remove as value from the input
             *
             * @ngscope
             * @method removeValue
             *
             * @param {mixed} value Value to remove
             * @param {boolean} [focusTextArea=true] Whether or not to focus the on input when removing the value
             */
            scope.removeValue = function(value, focusTextArea) {
              focusTextArea = focusTextArea || true;
              if(scope.options.tagOptions.enabled === true) {
                if(focusTextArea === true) {
                  $(element).find('input.display').focus();
                }

                var removeKey = utilities.getKeyByPropertyValue(scope.options.data, 'value', value);
                scope.options.data.splice(removeKey, 1);
              } else {
                //since there is no tagging, we should only be store one value so just clear it out
                scope.options.data = [];
              }
            };

            /**
             * Retrieve the value for the hidden input
             *
             * @ngscope
             * @method getHiddenValue
             *
             * @returns {string} Hidden input value
             */
            scope.getHiddenValue = function() {
              if(scope.options.tagOptions.enabled === true) {
                return scope.options.data.length > 0 ? angular.toJson(scope.options.data) : '';
              } else {
                return (scope.options.data[0] ? scope.options.data[0].value : '');
              }
            }

            /**
             * Retrieve the value for the displau input
             *
             * @ngscope
             * @method getVisibleValue
             *
             * @returns {string} Display input value
             */
            scope.getVisibleValue = function() {
              if(scope.options.tagOptions.enabled === true) {
                return '';
              } else {
                return (scope.options.data[0] ? scope.options.data[0].display : '');
              }
            };

            /**
             * Retrieve the value in the simulated text area
             *
             * @ngscope
             * @method getTextAreaValue
             *
             * @returns {string} Simulate text area value
             */
            scope.getTextAreaValue = function() {
              return $(element).find('input.display').val();
            };

            this.getTextAreaValue = scope.getTextAreaValue;

            /**
             * Whether or not the passed index is currently the selected tag
             *
             * @ngscope
             * @method isSelectedTag
             *
             * @param {number} index Number of the index (zero-based) to check for current selection
             *
             * @returns {boolean} Whether passed index is selected tag
             */
            scope.isSelectedTag = function(index) {
              return index === scope.options.tagOptions.selectedTagIndex;
            };

            /**
             * Unselected any selected tag
             *
             * @ngscope
             * @method resetSelectedTag
             */
            scope.resetSelectedTag = function() {
              scope.options.tagOptions.selectedTagIndex = null;
            };

            /**
             * Whether or not the passed index is currently the selected auto complete option
             *
             * @ngscope
             * @method isSelectedOption
             *
             * @param {number} index Number of the index (zero-based) to check for current auto complete option
             *
             * @returns {boolean} Whether passed index is selected auto complete option
             */
            scope.isSelectedOption = function(index) {
              return index === scope.options.autoCompleteOptions.selectedOptionIndex;
            };

            /**
             * Unselected any selected auto complete option
             *
             * @ngscope
             * @method resetSelectedOption
             */
            scope.resetSelectedOption = function() {
              scope.options.autoCompleteOptions.selectedOptionIndex = 0;
            };

            /**
             * Manually specific the selected auto complete option by index
             *
             * @ngscope
             * @method selectOption
             *
             * @param {number} key Number of the index (zero-based) select for auto complete
             */
            scope.selectOption = function(index) {
              scope.options.autoCompleteOptions.selectedOptionIndex = index;
            };

            /**
             * Set the value to whatever is selected in the auto complete
             *
             * @ngscope
             * @method setValueFromAutoComplete
             */
            scope.setValueFromAutoComplete = function() {
              var newItem = scope.options.autoCompleteOptions.options[scope.options.autoCompleteOptions.selectedOptionIndex];
              scope.newValue(newItem.display, newItem.value);
              resetAutoCompleteOptions();
              scope.options.autoCompleteOptions.isNew = false;
            };

            /**
             * Mouse down event handler for auto comeplete elements
             *
             * @ngscope
             * @method setValueAutoCompleteMouseDown
             */
            scope.setValueAutoCompleteMouseDown = function() {
              scope.setValueFromAutoComplete();
            }

            /**
             * Mouseup event handler
             *
             * @ngscope
             * @method mouseUp
             *
             * @param {object} $event Event
             */
            scope.mouseUp = function($event) {
              if(scope.options.selectOnFocus === true) {
                $(element).find('input.display').select();
              }
            };

            /**
             * Key down event handler
             *
             * @ngscope
             * @method keyDown
             *
             * @param {object} $event Event
             */
            scope.keyDown = function($event) {
              //handle prevent of enter submitted form
              if((scope.options.tagOptions.enabled === true || scope.options.preventSubmitOnEnter === true) && $event.which === 13) {
                $event.preventDefault();
              }

              //handling tag mode key binging
              if(scope.options.tagOptions.enabled === true) {
                if($event.which === 13 && scope.options.autoCompleteOptions.options.length === 0 && scope.options.autoCompleteOptions.enabled === false) { //enter
                  $event.preventDefault();
                  scope.newValue($(element).find('input.display').val());
                } else if($event.which === 9 && scope.options.autoCompleteOptions.options.length === 0 && scope.options.autoCompleteOptions.enabled === false) { //tab
                  $event.preventDefault();
                  scope.newValue($(element).find('input.display').val());
                } else if($event.which === 9) {
                } else if($event.which === 37 && $(element).find('input.display').val() === '') { //left arrow
                  if(angular.isNumber(scope.options.tagOptions.selectedTagIndex)) {
                    scope.options.tagOptions.selectedTagIndex =
                    (scope.options.tagOptions.selectedTagIndex - 1 < 0
                    ? 0
                    : scope.options.tagOptions.selectedTagIndex - 1);
                  } else {
                    scope.options.tagOptions.selectedTagIndex = scope.options.data.length - 1;
                  }
                } else if($event.which === 39 && $(element).find('input.display').val() === '') { //right arrow
                  if(angular.isNumber(scope.options.tagOptions.selectedTagIndex)) {
                    scope.options.tagOptions.selectedTagIndex =
                    (scope.options.tagOptions.selectedTagIndex + 1 >= scope.options.data.length
                    ? scope.options.data.length - 1
                    : scope.options.tagOptions.selectedTagIndex + 1);
                  }
                } else if($event.which === 8) { //backspace
                  if(angular.isNumber(scope.options.tagOptions.selectedTagIndex) && scope.options.data[scope.options.tagOptions.selectedTagIndex]) {
                    scope.removeValue(scope.options.data[scope.options.tagOptions.selectedTagIndex].value);
                    scope.resetSelectedTag();
                  } else if($(element).find('input.display').val() === '') {
                    scope.options.tagOptions.selectedTagIndex = scope.options.data.length - 1;
                  }
                } else if(angular.isNumber(scope.options.tagOptions.selectedTagIndex)) { //if no other matches, make sure that nothing is selected
                  scope.resetSelectedTag();
                }
              }

              if(scope.options.autoCompleteOptions.enabled === true) {
                if($event.which === 13) { //enter
                  if(scope.options.autoCompleteOptions.options.length > 0) {
                    $event.preventDefault();
                    scope.setValueFromAutoComplete();
                  }
                }/* else if($event.which === 9 && $event.shiftKey === false) { //tab
                  if(scope.options.autoCompleteOptions.options.length > 0) {
                    $event.preventDefault();
                    scope.setValueFromAutoComplete();
                    $($event.target).next(':input').focus();
                  }
                }*/ else if($event.which == 38) { //up arrow
                  $event.preventDefault();
                  scope.options.autoCompleteOptions.selectedOptionIndex =
                  (scope.options.autoCompleteOptions.selectedOptionIndex - 1 < 0
                  ? scope.options.autoCompleteOptions.options.length - 1
                  : scope.options.autoCompleteOptions.selectedOptionIndex - 1);
                } else if($event.which == 40) { //down arrow
                  $event.preventDefault();
                  scope.options.autoCompleteOptions.selectedOptionIndex =
                  (scope.options.autoCompleteOptions.selectedOptionIndex + 1 >= scope.options.autoCompleteOptions.options.length
                  ? 0
                  : scope.options.autoCompleteOptions.selectedOptionIndex + 1);
                }
              }
            };

            /**
             * Key up event handler
             *
             * @ngscope
             * @method keyUp
             *
             * @param {object} $event Event
             */
            scope.keyUp = function($event) {
              if(scope.options.autoCompleteOptions.enabled === true) {
                if($event.which == 38 || $event.which == 40) {
                  $event.preventDefault();
                } else if(_.indexOf(noneAffectingTextKeys, $event.which) === -1) {
                  //using any character that affects text should reset the value if not allowing free form with auto complete
                  var textAreaValue = $(element).find('input.display').val();

                  if(scope.options.autoCompleteOptions.allowFreeForm !== true || textAreaValue == '') {
                    scope.modelController.$setViewValue('');
                  }

                  if(scope.options.autoCompleteOptions.allowFreeForm === true) {
                    scope.newValue(textAreaValue);
                  }

                  if(scope.options.autoCompleteOptions.source === 'local') {
                    displayAutoComplete(true);
                    getData();
                  } else if(textAreaValue.length >= scope.options.autoCompleteOptions.loadCharacterCount) {
                    displayAutoComplete(true);

                    nagBeat.add(beatName, function() {
                      getData();
                    }, scope.options.autoCompleteOptions.searchDelay, {
                      once: true,
                      overwrite: true
                    });
                  } else if(scope.options.autoCompleteOptions.display === true) {
                    hideAutoComplete();
                  }
                }
              } else if(scope.options.autoCompleteOptions.enabled === false && scope.options.tagOptions.enabled === false) {
                scope.newValue($(element).find('input.display').val());
              }
            };

            /**
             * Blur event handler
             *
             * @ngscope
             * @method blue
             *
             * @param {object} $event Event
             */
            scope.blur = function($event) {
              if(scope.options.tagOptions.enabled === true) {
                setDisplayInput('');
                scope.options.tagOptions.selectedTagIndex = null;
              }

              if(scope.options.autoCompleteOptions.enabled === true) {
                if(
                  scope.options.autoCompleteOptions.selectOnBlur === true
                  && scope.options.autoCompleteOptions.options[scope.options.autoCompleteOptions.selectedOptionIndex]
                ) {
                  scope.setValueFromAutoComplete();
                } else if(
                  scope.options.autoCompleteOptions.allowFreeForm !== true
                  && (_.isEmpty(scope.modelController.$viewValue) && !_.isNumber(scope.modelController.$viewValue))
                ) {
                  scope.resetAutoCompleteValues(true);
                }

                hideAutoComplete();

                scope.options.autoCompleteOptions.selectedOptionIndex = null;
                scope.options.autoCompleteOptions.options = defaultAutoCompleteOptions;
              }

              scope.isActive = false;
            };

            /**
             * Focus event handler
             *
             * @ngscope
             * @method focus
             *
             * @param {object} $event Event
             */
            scope.focus = function($event) {
              scope.isActive = true;

              if(scope.options.autoCompleteOptions.source === 'local') {
                getData();
                displayAutoComplete(true);
              }
            };

            /**
             * Double click event handler
             *
             * @ngscope
             * @method doubleClick
             *
             * @param {object} $event Event
             */
            scope.doubleClick = function($event, value) {
              if(scope.options.tagOptions.doubleClickEdit === true) {
                scope.removeValue(value);
                setDisplayInput(value);
              }
            };

            /**
             * Click event handler for ul
             *
             * @ngscope
             * @method ulClick
             *
             * @param {object} $event Event
             */
            scope.ulClick = function($event) {
              $event.stopPropagation();
              element.find('input.display').focus();
            };

            /**
             * Returns the "new item" display value
             *
             * @ngscope
             * @method getNewItemValue
             *
             * @returns {string} The display value for "new item"
             */
            scope.getNewItemValue = function() {
              return scope.getTextAreaValue();// + ' (' + scope.options.autoCompleteOptions.newText + ')';
            },

            /**
             * Update visible/hidden inputs when data changes
             *
             * @ngwatch options.data
             */
            scope.$watch('options.data', function(newValue, oldValue) {
              dataUpdate();

              //need to make sure that the DOM is available to modify
              $timeout(function(){
                updateTextAreaPadding();
                updateAutoCompletePosition();
                //setElementHeight();
              }, 0);
            }, true);

            /**
             * Update auto complete position when auto complete options change
             *
             * @ngwatch options.autoCompleteOptions.options
             */
            scope.$watch('options.autoCompleteOptions.options', function(newValue, oldValue) {
              $timeout(function(){
                updateAutoCompletePosition();
              }, 0);
            }, true);

            /**
             * Set the data when the set-data event is triggered for the extend box, event name uses the data-id attribute to listen to a unique event name
             *
             * @todo: replace the call the .replace with a method that wrap this functionality
             * @respondto NagExtendText[attribute id]/setData
             * @eventlevel root
             */
            scope.unregisterSetDataEvent = $rootScope.$on('NagExtendText[' + attributes.id.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');}) + ']/setData', function(self, data) {
              //reset the data to the passed in data
              dontFocusOnCursorPlacement = true;
              scope.options.data = data;
            });

            var parentFormName = element.parents('form').slice(0, 1).attr('name');

            if(parentFormName) {
              /**
               * Set the data when the set-data event is triggered for the extend box, event name uses the data-id attribute to listen to a unique event name
               *
               * @respondto NagForm[form name]/reset
               * @eventlevel root
               */
              scope.unregisterResetFormEvent = $rootScope.$on('NagForm[' + parentFormName +']/reset', function(self) {
                  scope.resetAutoCompleteValues(true);
              });
            }
          }
        };
      }
    }
  }
]);
