/**
 * Extend text component
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
  'nag.event'
])
.directive('nagExtendText', [
  '$timeout',
  '$http',
  'nagBeat',
  '$compile',
  'nagHelper',
  'nagDefaults',
  'noneAffectingTextKeys',
  function($timeout, $http, nagBeat, $compile, nagHelper, nagDefaults, noneAffectingTextKeys){
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
        }
      ],
      templateUrl: 'components/nucleus-angular-extend-text/assets/templates/extend-text.html',
      transclude: true,
      compile: function(element, attributes, transclude) {
        if(!attributes.id) {
            throw new Error("Must provide data-id attribute for extend text");
        }
        element.addClass('extend-text');
        return {
          pre: function(scope, element, attributes, controllers) {
            //add callback if this form is a resettable form
            //todo: refactor: use events instead of callbacks
            if(controllers) {
              if(controllers[0]) {
                controllers[0].addCallback(function() {
                  scope.resetValues();
                });
              }
            }

            /*scope.options = nagDefaults.getExtendTextOptions(scope.options);

            //var template = $(nagHelper.getAsyncTemplate(scope.options.templateUrl, scope.options));
            element.find('input[type="hidden"]').attr('ng-model', 'model.' + scope.options.ngModel);
//            template.find('input').attr('ng-model', 'model.' + scope.options.ngModel);

            if(scope.options.autoFocus === true) {
                element.find('input.display').attr('nag-auto-focus', '');
            }

            element.addClass('extend-text');
            //console.log(element.attr('ng-model'));
            //template.attr('ng-model', element.attr('ng-model'));

            //element.html($compile(template)(scope));*/
          },
          post: function(scope, element, attributes, controllers) {
            transclude(scope, function(clone) {
              var displayElement = clone.filter('input.display');
              var hiddenElement = clone.filter('input[type="hidden"]');

              displayElement.attr('ng-class', "{'ng-valid': modelController.$dirty && modelController.$valid, 'ng-invalid': modelController.$dirty && modelController.$invalid}")
              .attr('nag-event', "{keyup: 'keyDown($event)', keydown: 'keyUp($event)', blur: 'blur($event)', focus: 'focus($event)'}")
              .attr('ng-mouseup', "mouseUp($event)")
              .attr('value', "{{ getVisibleValue() }}");

              element.find('.inputs').append($compile(displayElement)(scope)).append(hiddenElement);
            });

            /**
             * Options
             *
             * @ngscope
             * @property {object} options
             *   @property {string} [options.rootTemplatePath=rootTemplatePath+'/nucleus-angular-extend-text/assets/templates'] Root path for templates
             *   @property {boolean} [options.selectOnFocus=false] Whether or not to select of data when focusing on input
             *   @property {boolean} [options.preventSubmitOnEnter=true] Whether or not the prevent form submission on the enter key when input focused
             *   @property {array} [options.data] The data for the input
             *   @proeprty {boolean} [options.autoFocus=false] Whether
             *   @property {string} [options.templateUrl="extend-text.html"] Main template url
             *   @property {string} [options.template=""] Template HTML
             */

            /**
             * Auto Complete Options
             *
             * @ngscope
             * @property {object} options.autoCompleteOptions
             *   @property {string} [options.autoCompleteOptions.rootTemplatePath=rootTemplatePath+'/nucleus-angular-extend-text/assets/templates']
             *   Root path for templates
             *   @property {boolean} [options.autoCompleteOptions.enabled=false] Whether or not auto complete functionality is enabled
             *   @property {boolean} [options.autoCompleteOptions.display=false] Whether or not the auto complete is currently being displayed
             *   @property {string} [options.autoCompleteOptions.url=null] Base url for where the auto complete data is retrieved from from
             *   @property {string} [options.autoCompleteOptions.variable="input"] Variable name to use in the query string when retrieving the auto complete data
             *   @property {string} [options.autoCompleteOptions.variableCache=null]
             *   The last value sent when retrieving the auto complete data in order to prevent duplicate requests for the same data
             *   @property {number} [options.autoCompleteOptions.loadCharacterCount=3]
             *   Number of character needed to be enter before attempting to retrieve data for the auto complete
             *   @property {number} [options.autoCompleteOptions.searchDelay=350]
             *   Number of milliseconds to wait from last key entered to search for data to prevent unnecessary request if the user was not done typing there search
             *   @property {cache} [options.autoCompleteOptions.cache=false]
             *   Whether or not to cache the result from the server, useful for smaller data sets where the entire set can be easily cached and parsed on the javascript side
             *   @property {array} [options.autoCompleteOptions.cachedData] Cached data is cache is set to true
             *   @property {array} [options.autoCompleteOptions.options] Current set of auto complete options being displayed
             *   @property {number} [options.autoCompleteOptions.selectedOptionIndex=0] Index (zero-based) or the currently selected option
             *   @property {boolean} [options.autoCompleteOptions.selectOnBlur=true] Selected the currently higlighted option when blurring on the input
             *   @property {boolean} [options.autoCompleteOptions.allowFreeForm=false]
             *   Allow the user to enter in free form text (does not have to match something in the auto complete)
             *   @property {function} [options.autoCompleteOptions.generateDataUrl]
             *   Generate the URL used to retrieve the auto complete data form the remote service
             *   @property {string} [options.autoCompleteOptions.remoteDataMethod="GET"] HTTP method to use when requesting data from the remote service
             *   @property {boolean} [options.autoCompleteOptions.loadingData=false] Whether or not to display the loaded data message
             *   @property {function} [options.autoCompleteOptions.responseParser] Function to parse the response when retrieving the auto complete data
             *   @property {function} [options.autoCompleteOptions.formatVariable] Function used to format the variable when generating the URL
             *   @property {function} [options.autoCompleteOptions.filter] Function to use to filter the data when cache is set to true
             */

            /**
             * Tagging Options
             *
             * @ngscope
             * @property {object} options.tagOptions
             *   @property {string} [options.rootTemplatePath=rootTemplatePath+'/nucleus-angular-extend-text/assets/templates'] Root path for templates
             *   @property {boolean} [options.tagOptions.enabled=false] Whether or not tagging is enabled
             *   @property {boolean} [options.tagOptions.allowDuplicates=false] Whether or not to allow duplicate values
             *   @property {number} [options.tagOptions.enabled=null] The index (zero-based) or the currently selected name
             *   @property {boolean} [options.tagOptions.doubleClickEdit=false] Whether or not to enable tag editing on double click
             */
            scope.options = nagDefaults.getExtendTextOptions(scope.options);
            var defaultAutoCompleteOptions = _.clone(scope.options.autoCompleteOptions.options);
            var beatName = 'extend-text-' + scope.$id;
            var addValue, setValue, updateTextAreaPadding, updateAutoCompletePosition, displayAutoComplete, hideAutoComplete, setElementHeight, getData, originalPadding, borderSize, originalMargin;

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

              //todo: research: the -1 is to account for the border the tag has because I am not sure how to handle that programmatically
              //todo: if someone where remove the border or make it thicker, this would have to change
              element.find('.tag-container').css({
                top: originalPadding.top + borderSize.top + originalMargin.top - 1,
                left: originalPadding.left + borderSize.left + originalMargin.left - 1
              });
            }, 0);

            addValue = function(display, value) {
              if(scope.options.tagOptions.allowDuplicates === true || ObjectArray.getKeyByPropertyValue(scope.options.data, 'value', value) === -1) {
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
              //console.log($(element).html());
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

            displayAutoComplete = function() {
              //need to make sure the auto complete is properly positioned
              updateAutoCompletePosition();

              scope.options.autoCompleteOptions.variableCache = null;
              scope.options.autoCompleteOptions.display = true;
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
              var url = scope.options.autoCompleteOptions.generateDataUrl.apply(scope, []);
              scope.options.autoCompleteOptions.loadingData = true;
              $http({method: scope.options.autoCompleteOptions.remoteDataMethod, url: url}).
              success(function(response, status, headers, config) {
                if(angular.isObject(response)) {
                  scope.options.autoCompleteOptions.options = scope.options.autoCompleteOptions.responseParser(response);
                }

                scope.options.autoCompleteOptions.loadingData = false;
              }).
              error(function(data, status, headers, config) {
                scope.options.autoCompleteOptions.loadingData = false;
                //todo: proper error handling
              });
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
                $(element).find('input.display').val('');
              } else {
                setValue(display, value);
                $(element).find('input.display').val(display);
              }
            };

            /**
             * Clear out the current input values
             *
             * @ngscope
             * @method resetValues
             *
             * @param {boolean} [leaveDisplayValue=false] Whether or not to clear out the display value too
             */
            scope.resetValues = function(leaveDisplayValue) {
              if(leaveDisplayValue !== true) {
                $(element).find('input.display').val('');
              }

              scope.options.data = [];
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

                var removeKey = ObjectArray.getKeyByPropertyValue(scope.options.data, 'value', value);
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
             * @todo: refactor: rename key to index
             * @param {number} key Number of the index (zero-based) to check for current selection
             *
             * @returns {boolean} Whether passed index is selected tag
             */
            scope.isSelectedTag = function(key) {
              return key === scope.options.tagOptions.selectedTagIndex;
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
             * @todo: refactor: rename key to index
             * @param {number} key Number of the index (zero-based) to check for current auto complete option
             *
             * @returns {boolean} Whether passed index is selected auto complete option
             */
            scope.isSelectedOption = function(key) {
              return key === scope.options.autoCompleteOptions.selectedOptionIndex;
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
             * Keydown event handler
             *
             * @ngscope
             * @method keyDown
             *
             * @param {object} $event Event
             */
            scope.keyDown = function($event) {
              /*//handle prevent of enter submitted form
              if((scope.options.tagOptions.enabled === true || scope.options.preventSubmitOnEnter === true) && $event.which === 13) {
                  $event.preventDefault();
              }

              if(scope.options.autoCompleteOptions.enabled === true) {
                if($event.which === 13 && scope.options.autoCompleteOptions.options.length > 0) { //enter
                  $event.preventDefault();
                } else if($event.which == 38) { //up arrow
                  $event.preventDefault();
                } else if($event.which == 40) { //down arrow
                  $event.preventDefault();
                } else if($event.which == 9) {
                  $event.preventDefault();
                }
              }*/
            };

            /**
             * Keyup event handler
             *
             * @ngscope
             * @method keyUp
             *
             * @param {object} $event Event
             */
            scope.keyUp = function($event) {
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
              } else if(scope.options.autoCompleteOptions.enabled === true && scope.options.autoCompleteOptions.allowFreeForm === true) {
                scope.newValue($(element).find('input.display').val());
              }

              if(scope.options.autoCompleteOptions.enabled === true) {
                if($event.which === 13) { //enter
                    if(scope.options.autoCompleteOptions.options.length > 0) {
                        $event.preventDefault();
                        var newItem = scope.options.autoCompleteOptions.options[scope.options.autoCompleteOptions.selectedOptionIndex];
                        scope.newValue(newItem.display, newItem.value);
                        scope.options.autoCompleteOptions.options = defaultAutoCompleteOptions;
                        scope.options.autoCompleteOptions.variableCache = null;
                        scope.options.autoCompleteOptions.selectedOptionIndex = 0;
                    }
                } else if($event.which === 9) { //tab
                  if(scope.options.autoCompleteOptions.options.length > 0) {
                      $event.preventDefault();
                      var newItem = scope.options.autoCompleteOptions.options[scope.options.autoCompleteOptions.selectedOptionIndex];
                      scope.newValue(newItem.display, newItem.value);
                      scope.options.autoCompleteOptions.options = defaultAutoCompleteOptions;
                      scope.options.autoCompleteOptions.variableCache = null;
                      scope.options.autoCompleteOptions.selectedOptionIndex = 0;
                  }
                } else if($event.which == 38) { //up arrow
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
                } else if(_.indexOf(noneAffectingTextKeys, $event.which) === -1) {
                  //using any character that affects text should reset the value if not allowing free form with auto complete
                  if(scope.options.autoCompleteOptions.allowFreeForm !== true) {
                    scope.modelController.$setViewValue('');
                  }

                  //using a timeout so that the input value is the proper value when evaluating it
                  $timeout(function() {
                    var textAreaValue = $(element).find('input.display').val();

                    if(textAreaValue != scope.options.autoCompleteOptions.variableCache) {
                      scope.options.autoCompleteOptions.options = defaultAutoCompleteOptions;

                      if(textAreaValue.length >= scope.options.autoCompleteOptions.loadCharacterCount) {
                        nagBeat.add(beatName, function() {
                          getData();
                        }, scope.options.autoCompleteOptions.searchDelay, {
                          once: true,
                          overwrite: true
                        });
                      }
                    }
                  }, 0);
                }
              }
            };

            /**
             * Blue event handler
             *
             * @ngscope
             * @method blue
             *
             * @param {object} $event Event
             */
            scope.blur = function($event) {
              if(scope.options.tagOptions.enabled === true) {
                $(element).find('input.display').val('');
                scope.options.tagOptions.selectedTagIndex = null;
              }

              if(scope.options.autoCompleteOptions.enabled === true) {
                hideAutoComplete();

                if(scope.options.autoCompleteOptions.selectOnBlur === true && scope.options.autoCompleteOptions.options[scope.options.autoCompleteOptions.selectedOptionIndex]) {
                  var newItem = scope.options.autoCompleteOptions.options[scope.options.autoCompleteOptions.selectedOptionIndex];
                  scope.newValue(newItem.display, newItem.value);
                }

                if(scope.options.autoCompleteOptions.allowFreeForm !== true && scope.$eval('model.' + scope.modelController.$name) == '') {
                  scope.resetValues();
                }

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
              if(scope.options.autoCompleteOptions.enabled === true) {
                scope.options.autoCompleteOptions.selectedOptionIndex = 0;
                displayAutoComplete();
              }

              scope.isActive = true;
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
                $(element).find('input.display').val(value);
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
             * Update visible/hidden inputs when data changes
             *
             * @ngwatch options.data
             */
            scope.$watch('options.data', function(newValue, oldValue) {
              $timeout(function(){
                var hiddenValue = scope.getHiddenValue();
                element.find('input[type="hidden"]').val(scope.getHiddenValue());
                element.find('input.display').val(scope.getVisibleValue());

                if(hiddenValue != '') {
                  scope.modelController.$setViewValue(scope.getHiddenValue());
                }

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

            //setElementHeight();

            /**
             * Set the data when the set-data event is triggered for the extend box, event name uses the data-id attribute to listen to a unique event name
             *
             * @respondto extend-text-[data-id]::set-data
             */
            scope.$on('extend-text-' + attributes.id + '::set-data', function(self, data) {
              scope.options.data = data;
            });
          }
        };
      }
    }
  }
]);
