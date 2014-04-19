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
 * @nghtmlattribute {object} data-model Data model to use for this component (must be an object)
 * @nghtmlattribute {string} data-type The type of input to create (omit for input, 'textarea' for textarea)
 * @nghtmlattribute {string} data-model-property the proeprty name of the model to use to store the value for the component
 * @nghtmlattribute {string{ data-input-name The name property for the hidden input
 */
angular.module('nag.extendText')
.directive('nagExtendText', [
  '$timeout',
  '$http',
  '$sce',
  'nagBeat',
  '$compile',
  'nagHelper',
  'nagDefaults',
  'noneAffectingTextKeys',
  '$rootScope',
  function($timeout, $http, $sce, nagBeat, $compile, nagHelper, nagDefaults, noneAffectingTextKeys, $rootScope){
    return {
      restrict: 'A',
      scope: {
        options: '=?nagExtendText',
        model: '='
      },
      require: [
        '^?nagResettableForm'
      ],
      controller: [
        '$scope',
        function($scope) {
          $scope.options = nagDefaults.getOptions('extendTextOptions', $scope.options);
          var searchQueryHelper = {
            lastValidatedQuery: null,
            lastHelpMessage: null,
            hasQueryChanged: function() {
              return searchQueryHelper.lastValidatedQuery !== $scope.getHiddenValue();
            },
            generateHelpMessage: function() {
              if($scope.getHiddenValue().length === 0) {
                message = 'No query entered';
              } else if($scope.searchQueryValidation === true) {
                message = 'Valid query entered';
              } else {
                var characterNumber = $scope.searchQueryValidation.characterNumber;

                if($scope.searchQueryValidation.queryLocation.substr(0, 3) === '...') {
                  characterNumber += ($scope.getHiddenValue().lastIndexOf($scope.searchQueryValidation.queryLocation.substr(3).trim()) - 3);
                }

                message = 'Error on line ' + $scope.searchQueryValidation.lineNumber + ' at character ' + characterNumber;
                searchQueryHelper.lastHelpMessage = message;
              }
            }
          };

          $scope.searchQueryValidation = true;
          $scope.validateSearchQuery = function() {
            //PERFORMANCE: since we call this method internally, we want to make sure not to run validation logic if the last validated query has not changed
            if(searchQueryHelper.hasQueryChanged()) {
              //TODO: searchQuery should be passed in as a option to make more configurable
              $scope.searchQueryValidation = searchQuery.validate($scope.getHiddenValue());
              searchQueryHelper.lastValidatedQuery = $scope.getHiddenValue();
              searchQueryHelper.generateHelpMessage();
            }
          };
          $scope.getSearchQueryHelpMessage = function() {
            return $sce.trustAsHtml(searchQueryHelper.lastHelpMessage);
          };
          $scope.tooltipModel = {
            getContent: $scope.getSearchQueryHelpMessage
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
      templateUrl: function(element, attributes){
        var templateUrl = nagHelper.getTemplatePath('extendText');

        if(attributes.type === 'textarea') {
          templateUrl = templateUrl.replace('.html', '-textarea.html');
        }

        return templateUrl;
      },
      compile: function(element, attributes) {
        if(!attributes.id) {
          throw new Error("Must provide data-id attribute for extend text");
        }

        if(!attributes.modelProperty) {
          throw new Error("Must provide data-model-property attribute for extend text");
        }

        element.find('input[type="hidden"]').attr('ng-model', 'model.' + attributes.modelProperty);

        if(attributes.inputName) {
          element.find('input[type="hidden"]').attr('name', attributes.inputName);
        }

        element.addClass('extend-text');
        return {
          post: function(scope, element, attributes, controllers) {
            var defaultAutoCompleteOptions = _.clone(scope.options.autoCompleteOptions.options);
            var beatName = 'extend-text-' + scope.$id;
            var addValue, setValue, updateTextAreaPadding, updateAutoCompletePosition, displayAutoComplete, hideAutoComplete, getData, originalPadding, borderSize, originalMargin, resetAutoCompleteOptions, setDisplayInput, dataUpdate, dontFocusOnCursorPlacement;
            dontFocusOnCursorPlacement = false;

            //todo: research: not sure why but I need to have the $timeout here for this to properly be able to pull the original padding
            $timeout(function() {
              originalPadding = {
                left: parseInt($(element).find('.display').css('paddingLeft'), 10),
                top: parseInt($(element).find('.display').css('paddingTop'), 10)
              };
              borderSize = {
                top: parseInt($(element).find('.display').css('borderTopWidth'), 10),
                left: parseInt($(element).find('.display').css('borderLeftWidth'), 10)
              };
              originalMargin = {
                top: parseInt($(element).find('.display').css('marginTop'), 10),
                left: parseInt($(element).find('.display').css('marginLeft'), 10)
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
                $(element).find('.display').css('paddingLeft', position.left + tagWidth + originalPadding.left);
                $(element).find('.display').css('paddingTop', positionTop);
              } else {
                $(element).find('.display').css('paddingLeft', originalPadding.left);
                $(element).find('.display').css('paddingTop', originalPadding.top);
              }
            };

            updateAutoCompletePosition = function() {
              var elementPosition = $(element).find('.display').position();
              var elementHeight = $(element).find('.display').outerHeight();
              var elementWidth = $(element).find('.display').outerWidth();
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
              scope.options.autoCompleteOptions.isNew = false;
              scope.options.autoCompleteOptions.variableCache = null;
              scope.options.autoCompleteOptions.display = false;
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

              var textAreaValue = $(element).find('.display').val();

              if(!_.isFunction(scope.options.autoCompleteOptions.getData)) {
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
                    } else {
                      scope.options.autoCompleteOptions.isNew = true;
                    }

                    scope.options.autoCompleteOptions.loadingData = false;
                  }).
                  error(function(data, status, headers, config) {
                    scope.options.autoCompleteOptions.loadingData = false;
                    //todo: proper error handling
                  });
                }
              } else {
                var getData = scope.options.autoCompleteOptions.getData.apply({
                  processData: processData,
                  filter: function(data) {
                    return scope.options.autoCompleteOptions.filter(data, textAreaValue);
                  }}, []);
              }
            };

            resetAutoCompleteOptions = function() {
              var defaultOptions;
              defaultOptions = defaultAutoCompleteOptions;

              scope.options.autoCompleteOptions.options = defaultOptions;
              scope.options.autoCompleteOptions.variableCache = null;
              scope.options.autoCompleteOptions.selectedOptionIndex = 0;
            };

            setDisplayInput = function(value) {
              var currentPosition = $(element).find('.display')[0].selectionStart;
              var positionCursor = (currentPosition < $(element).find('.display').val().length);
              $(element).find('.display').val(value)

              //if positionCursor is zero all browser except IE won't do anything but IE will focus the element which is not desired effect
              //so we need something additional to track whether or not the auto focus the element
              if(positionCursor && !dontFocusOnCursorPlacement) {
                $(element).find('.display')[0].setSelectionRange(currentPosition, currentPosition);
              }

              dontFocusOnCursorPlacement = false;
            };

            dataUpdate = function() {
              var hiddenValue = scope.getHiddenValue();
              element.find('input[type="hidden"]').val(hiddenValue);
              scope.modelController.$setViewValue(hiddenValue);

              setDisplayInput(scope.getVisibleValue());
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

              if(_.isFunction(scope.options.autoCompleteOptions.setValue)) {
                  var test = scope.options.autoCompleteOptions.setValue(scope.getTextAreaValue(), display, value);

                  display = test.display;
                  value = test.value;
              }

              if(scope.options.tagOptions.enabled === true) {
                addValue(display, value);
                setDisplayInput('');
              } else {
                setValue(display, value);
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

              dataUpdate();

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
                  $(element).find('.display').focus();
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
             * @TODO: rename since this is sometimes an input and sometimes a textarea
             *
             * @ngscope
             * @method getTextAreaValue
             *
             * @returns {string} Simulate text area value
             */
            scope.getTextAreaValue = function() {
              return $(element).find('.display').val();
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
              hideAutoComplete();
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
                $(element).find('.display').select();
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
              if((scope.options.tagOptions.enabled === true || scope.options.preventSubmitOnEnter === true) && scope.options.searchQueryOptions.enabled !== true && $event.which === 13) {
                $event.preventDefault();
              }

              //handling tag mode key binging
              if(scope.options.tagOptions.enabled === true) {
                if($event.which === 13 && scope.options.autoCompleteOptions.options.length === 0 && scope.options.autoCompleteOptions.enabled === false) { //enter
                  $event.preventDefault();
                  scope.newValue($(element).find('.display').val());
                } else if($event.which === 9 && scope.options.autoCompleteOptions.options.length === 0 && scope.options.autoCompleteOptions.enabled === false) { //tab
                  $event.preventDefault();
                  scope.newValue($(element).find('.display').val());
                } else if($event.which === 9) {
                } else if($event.which === 37 && $(element).find('.display').val() === '') { //left arrow
                  if(angular.isNumber(scope.options.tagOptions.selectedTagIndex)) {
                    scope.options.tagOptions.selectedTagIndex =
                    (scope.options.tagOptions.selectedTagIndex - 1 < 0
                    ? 0
                    : scope.options.tagOptions.selectedTagIndex - 1);
                  } else {
                    scope.options.tagOptions.selectedTagIndex = scope.options.data.length - 1;
                  }
                } else if($event.which === 39 && $(element).find('.display').val() === '') { //right arrow
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
                  } else if($(element).find('.display').val() === '') {
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
                }
                //todo: should this is a configurable option?
                /* else if($event.which === 9 && $event.shiftKey === false) { //tab
                  if(scope.options.autoCompleteOptions.options.length > 0) {
                    $event.preventDefault();
                    scope.setValueFromAutoComplete();
                    $($event.target).next(':input').focus();
                  }
                }*/ else if($event.which == 38) { //up arrow
                  $event.preventDefault();

                  var autoCompleteWrapValue =
                  (scope.showFreeFormAsOption() && _.isNumber(scope.options.autoCompleteOptions.selectedOptionIndex))
                  ? 'new' 
                  : scope.options.autoCompleteOptions.options.length - 1;
                  
                  scope.options.autoCompleteOptions.selectedOptionIndex =
                  (scope.options.autoCompleteOptions.selectedOptionIndex - 1 < 0 || !_.isNumber(scope.options.autoCompleteOptions.selectedOptionIndex)
                  ? autoCompleteWrapValue
                  : scope.options.autoCompleteOptions.selectedOptionIndex - 1);
                } else if($event.which == 40) { //down arrow
                  $event.preventDefault();

                  var autoCompleteWrapValue =
                  (scope.showFreeFormAsOption() && _.isNumber(scope.options.autoCompleteOptions.selectedOptionIndex))
                  ? 'new' 
                  : 0;

                  scope.options.autoCompleteOptions.selectedOptionIndex =
                  (scope.options.autoCompleteOptions.selectedOptionIndex + 1 >= scope.options.autoCompleteOptions.options.length || !_.isNumber(scope.options.autoCompleteOptions.selectedOptionIndex)
                  ? autoCompleteWrapValue
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
                  var textAreaValue = $(element).find('.display').val();

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
                scope.newValue($(element).find('.display').val());
              }

              if(scope.options.searchQueryOptions.enabled === true) {
                scope.validateSearchQuery();

                if(scope.options.searchQueryOptions.autoHeight === true) {
                  scope.autoHeightSearchQuery();
                }
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
              element.find('.display').focus();
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
            };

            /**
             * Whether or not we should be show the free form text as an option
             * 
             * @ngscope
             * method showFreeFormAsOption
             *
             * @returns {boolean} Whether or not we should be show the free form text as an option
             */
            scope.showFreeFormAsOption = function() {
              return scope.options.autoCompleteOptions.allowFreeForm == true
                     && scope.options.autoCompleteOptions.isNew == true
                     && scope.getTextAreaValue().length > 0
                     && scope.options.autoCompleteOptions.freeFormIndicator == 'option';
            };

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

            scope.autoHeightSearchQuery = function() {
              var element = $(event.target);

              if(element.scrollTop() > 0) {
                //textarea does not automatically scroll to the very bottom so we need to do it
                element.scrollTop(100);
                element.css('height', element.outerHeight() + element.scrollTop());
              }
            };

            scope.cursorToError = function() {
              var characterNumber = scope.searchQueryValidation.characterNumber - 1 + (scope.searchQueryValidation.lineNumber - 1);
              var queryErrorLocationIndex = scope.getHiddenValue().lastIndexOf(scope.searchQueryValidation.queryLocation.substr(3));

              if(scope.searchQueryValidation.queryLocation.substr(0, 3) === '...' && queryErrorLocationIndex !== -1) {
                characterNumber += (queryErrorLocationIndex - 3);
              }

              $(element).find('textarea')[0].setSelectionRange(characterNumber, characterNumber);
            }
          }
        };
      }
    }
  }
]);
