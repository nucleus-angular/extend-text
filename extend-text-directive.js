/**
 * # Nucleus Angular Extend Text
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
 * ## Parsing
 *
 * TBD
 *
 * @module nag.extendTextfullValue
 * @ngdirective nagExtendText
 *
 * @nghtmlattribute {object} nag-extend-text Tells AngularJS this element is an extend text component and the passed object overwrite default for $scope.options
 * @nghtmlattribute {object} data-model Data model to use for this component (must be an object)
 * @nghtmlattribute {string} data-type The type of input to create (omit for input, 'textarea' for textarea)
 * @nghtmlattribute {string} data-model-property the property name of the model to use to store the value for the component
 * @nghtmlattribute {string{ data-input-name The name property for the hidden input
 */
angular.module('nag.extendText')
.directive('nagExtendText', [
  '$timeout',
  '$http',
  'nagBeat',
  '$compile',
  'nagHelper',
  'noneAffectingTextKeys',
  '$rootScope',
  function($timeout, $http, nagBeat, $compile, nagHelper, noneAffectingTextKeys, $rootScope){
    return {
      restrict: 'A',
      scope: {
        options: '=?nagExtendText',
        model: '='
      },
      require: [
        '^?nagResettableForm',
        'nagExtendText'
      ],
      controller: 'NagExtendTextDCtrl',
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

        //allows for adding any attribute to the hidden input
        if(attributes.attributes) {
          var attributes = attributes.attributes.split(';');

          _.forEach(attributes, function(attribute) {
            var attributeParts = attribute.split('::');
            element.find('input[type="hidden"]').attr(attributeParts[0], attributeParts[1] || '');
          });
        }

        element.addClass('extend-text');
        return {
          post: function(scope, element, attributes, controllers) {
            var selfController = controllers[1];
            var originalPadding, borderSize, originalMargin;
            var dontFocusOnCursorPlacement = false;
            var newCursorPosition = {};
            var setPristineInDataWatch = false;

            //this is used as the content for functions that are executed here but defined in the configuration object
            var callbackContext = {
              $scope: scope,
              controller: selfController
            };

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

            /**
             * Updates the padding within the input in order to
             */
            var updateTextAreaPadding = function() {
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

            var getData = function(searchValue) {
              searchValue = searchValue || scope.getTextAreaValue();

              if(!_.isFunction(scope.options.autoCompleteOptions.getData)) {
                if(scope.options.autoCompleteOptions.source === 'local') {
                  var data = searchValue.length > 0
                  ? scope.options.autoCompleteOptions.filter(selfController.objectizeData(scope.options.autoCompleteOptions.localData), searchValue)
                  : scope.options.autoCompleteOptions.localData;

                  selfController.processData(data);
                  scope.options.autoCompleteOptions.loadingData = false;
                } else if(searchValue != scope.options.autoCompleteOptions.variableCache) {
                  var url = scope.options.autoCompleteOptions.generateDataUrl.apply(callbackContext, [searchValue]);
                  scope.options.autoCompleteOptions.loadingData = true;

                  $http({method: scope.options.autoCompleteOptions.remoteDataMethod, url: url}).
                  success(function(response, status, headers, config) {
                    if(angular.isObject(response)) {
                      selfController.processData(scope.options.autoCompleteOptions.responseParser(response));
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
                scope.options.autoCompleteOptions.getData.apply(callbackContext, []);
              }
            };

            var setDisplayInput = function(value) {
              $(element).find('.display')[0].value = value;

              scope.positionCursor();
            };

            var dataUpdate = function() {
              var hiddenValue = scope.getHiddenValue();
              element.find('input[type="hidden"]').val(hiddenValue);

              //we don't want to set the view value if the initial data change is an empty becuase that will set $dirty to true on the controller even though
              //in this context '' == undefined
              if(!(hiddenValue === '' && (scope.modelController.$viewValue === undefined || scope.modelController.$viewValue === null))) {
                scope.modelController.$setViewValue(hiddenValue);
              }

              setDisplayInput(scope.getVisibleValue());
            };

            /**
             * Updates the auto complete position
             *
             * @ngscope
             * @method updateAutoCompletePosition
             */
            scope.updateAutoCompletePosition = function() {
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

            /**
             * Set the position of the cursor
             *
             * @ngscope
             * @method positionCursor
             */
            scope.positionCursor = function() {
              if(newCursorPosition.start) {
                var cursorPositionStart = newCursorPosition.start || $(element).find('.display')[0].selectionStart;
                var cursorPositionEnd = newCursorPosition.end || cursorPositionStart;
                var positionCursorFlag = (cursorPositionStart < $(element).find('.display').val().length);

                //if positionCursor is zero all browser except IE won't do anything but IE will focus the element which is not desired effect
                //so we need something additional to track whether or not the auto focus the element
                if(positionCursorFlag && !dontFocusOnCursorPlacement) {
                  //TODO: investigate: can this be done without the $timeout, is the $timeout harmful here?
                  //need to make sure that the text has been updated when setting the position
                  $timeout(function(){$(element).find('.display')[0].setSelectionRange(cursorPositionStart, cursorPositionEnd);}, 0);
                }

                dontFocusOnCursorPlacement = false;
                newCursorPosition = {};
              }
            };

            /**
             * Return the value from the input up until the cursor position
             *
             * @ngscope
             * @method getTextAreaValueFromCursor
             *
             * @returns {string} Value from the input up until the cursor position
             */
            scope.getTextAreaValueFromCursor = function() {
              var value = scope.getTextAreaValue();
              var cursorPosition = $(element).find('.display')[0].selectionStart;

              return value.substr(0, cursorPosition);
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
              var isAutoCompleteSelection = (value || value == '') ? true : false;
              value = value || display;

              if(scope.options.tagOptions.enabled === true && value === '') {
                return;
              }

              if(_.isFunction(scope.options.autoCompleteOptions.setValue)) {
                var test = scope.options.autoCompleteOptions.setValue.apply(callbackContext, [display, value, isAutoCompleteSelection]);

                display = test.display;
                value = test.value;

                if(test.cursorPosition) {
                  newCursorPosition = test.cursorPosition;
                }
              }

              if(scope.options.tagOptions.enabled === true) {
                selfController.addValue(display, value);
                setDisplayInput('');
              } else {
                selfController.setValue(display, value);
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

              selfController.resetAutoCompleteOptions();
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
             * Retrieve the value for the display input
             *
             * @ngscope
             * @method getVisibleValue
             *
             * @returns {string} Display input value
             */
            scope.getVisibleValue = function() {
              var value;

              if(scope.options.tagOptions.enabled === true) {
                value = '';
              } else {
                value = (scope.options.data[0] ? scope.options.data[0].display : '');
              }

              return value;
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
              selfController.resetAutoCompleteOptions();
              selfController.hideAutoComplete();
            };

            /**
             * Mouse down event handler for auto comeplete elements
             *
             * @ngscope
             * @method setValueAutoCompleteMouseDown
             */
            scope.setValueAutoCompleteMouseDown = function() {
              scope.setValueFromAutoComplete();
            };

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
             * Mouse down event for input
             *
             * @ngscope
             * @method mouseDown
             *
             * @param {object} $event Event object
             */
            scope.mouseDown = function($event) {
              scope.isActive = true;

              if(scope.options.autoCompleteOptions.source === 'local' || scope.options.autoCompleteOptions.loadCharacterCount === 0) {
                //need timeout so that getting the cursor value work properly when clicking into the input
                $timeout(function() {
                  getData();
                  selfController.displayAutoComplete(true);
                }, 0);
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
              if($($event.currentTarget)[0].tagName !== 'TEXTAREA' && (scope.options.tagOptions.enabled === true || scope.options.preventSubmitOnEnter === true) && scope.options.parsingOptions.enabled !== true && $event.which === 13) {
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
                } else if(_.indexOf(noneAffectingTextKeys, $event.which) === -1 || scope.options.parsingOptions.enabled === true || $event.which == 37 || $event.which == 39) {
                  //using any character that affects text should reset the value if not allowing free form with auto complete
                  var searchValue = scope.getTextAreaValueFromCursor();

                  if(scope.options.autoCompleteOptions.allowFreeForm !== true || searchValue == '') {
                    scope.modelController.$setViewValue('');
                  }

                  if(scope.options.autoCompleteOptions.allowFreeForm === true && $event.which != 13) {
                    scope.newValue($(element).find('.display').val());
                  }

                  if(scope.options.autoCompleteOptions.source === 'local') {
                    selfController.displayAutoComplete(true);
                    getData(searchValue);
                  } else if(searchValue.length >= scope.options.autoCompleteOptions.loadCharacterCount) {
                    selfController.displayAutoComplete(true);

                    nagBeat.add(selfController.beatName, function() {
                      getData(searchValue);
                    }, scope.options.autoCompleteOptions.searchDelay, {
                      once: true,
                      overwrite: true
                    });
                  } else if(scope.options.autoCompleteOptions.display === true) {
                    selfController.hideAutoComplete();
                  }
                }
              } else if(scope.options.autoCompleteOptions.enabled === false && scope.options.tagOptions.enabled === false) {
                scope.newValue($(element).find('.display').val());
              }

              if(scope.options.parsingOptions.enabled === true) {
                scope.validateParsing();
              }

              if(scope.options.autoHeight === true) {
                scope.autoHeight();
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

                selfController.hideAutoComplete();

                scope.options.autoCompleteOptions.selectedOptionIndex = null;
                scope.options.autoCompleteOptions.options = selfController.defaultAutoCompleteOptions;
              }

              scope.isActive = false;
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
              return scope.getTextAreaValue();
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

              if(setPristineInDataWatch === true) {
                scope.modelController.$setPristine();
                setPristineInDataWatch = false;
              }

              //need to make sure that the DOM is available to modify
              $timeout(function(){
                updateTextAreaPadding();
                scope.updateAutoCompletePosition();
              }, 0);
            }, true);

            /**
             * Update auto complete position when auto complete options change
             *
             * @ngwatch options.autoCompleteOptions.options
             */
            scope.$watch('options.autoCompleteOptions.options', function(newValue, oldValue) {
              $timeout(function(){
                scope.updateAutoCompletePosition();
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
                //we always want to do set pristine in next data watch for allow free form fields because we do call $setViewValue() for empty string with
                //free form fields which will set the model controller to dirty
                if(scope.getHiddenValue() != '' || scope.options.autoCompleteOptions.allowFreeForm === true) {
                  setPristineInDataWatch = true;
                }

                scope.resetAutoCompleteValues(true);
              });
            }

            /**
             * Automatically sets the height of the input
             *
             * @ngscope
             * @method autoHeight
             */
            scope.autoHeight = function() {
              var element = $(event.target);

              if(element.scrollTop() > 0) {
                //textarea does not automatically scroll to the very bottom so we need to do it
                element.scrollTop(100);
                element.css('height', element.outerHeight() + element.scrollTop());
              }
            };

            /**
             * Sets the cursor to the location of the error from the parser
             *
             * @ngscope
             * @method cursorToError
             */
            scope.cursorToError = function() {
              var characterNumber = scope.parsingValidation.characterNumber - 1 + (scope.parsingValidation.lineNumber - 1);
              var queryErrorLocationIndex = scope.getHiddenValue().lastIndexOf(scope.parsingValidation.queryLocation.substr(3));

              if(scope.parsingValidation.queryLocation.substr(0, 3) === '...' && queryErrorLocationIndex !== -1) {
                characterNumber += (queryErrorLocationIndex - 3);
              }

              $(element).find('textarea')[0].setSelectionRange(characterNumber, characterNumber);
            };

            $timeout(function() {
              var toConvert = element.find('.tooltip img');

              if(toConvert.length > 0) {
                toConvert.addClass('svg-icon');
                SVGInjector(toConvert.get());
              }
            }, 0);

            scope.$watch('isActive', function(newValue) {
              if(newValue === true) {
                element.addClass('is-active');
              } else {
                element.removeClass('is-active');
              }
            });

            scope.$watch('options.autoCompleteOptions.enabled', function(newValue) {
              if(newValue === true) {
                element.addClass('auto-complete');
              } else {
                element.removeClass('auto-complete');
              }
            });

            scope.$watch('options.parsingOptions.enabled', function(newValue) {
              if(newValue === true) {
                element.addClass('parsing');
              } else {
                element.removeClass('parsing');
              }
            });
          }
        };
      }
    }
  }
]);
