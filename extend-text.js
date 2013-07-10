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
          this.setModelController = function(modelController) {
            $scope.modelController = modelController;
          }
        }
      ],
      templateUrl: 'components/nucleus-angular-extend-text/assets/templates/extend-text.html',
      transclude: true,
      compile: function(element, attributes, transclude) {
        element.addClass('extend-text');
        return {
          pre: function(scope, element, attributes, controllers) {
            //add callback if this form is a resettable form
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

            scope.isActive = false;

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

            scope.resetValues = function(leaveDisplayValue) {
              if(leaveDisplayValue !== true) {
                $(element).find('input.display').val('');
              }

              scope.options.data = [];
            }

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

            scope.getHiddenValue = function() {
              if(scope.options.tagOptions.enabled === true) {
                return scope.options.data.length > 0 ? angular.toJson(scope.options.data) : '';
              } else {
                return (scope.options.data[0] ? scope.options.data[0].value : '');
              }
            }

            scope.getVisibleValue = function() {
              if(scope.options.tagOptions.enabled === true) {
                return '';
              } else {
                return (scope.options.data[0] ? scope.options.data[0].display : '');
              }
            };

            scope.getTextAreaValue = function() {
              return $(element).find('input.display').val();
            };

            this.getTextAreaValue = scope.getTextAreaValue;

            scope.isSelectedTag = function(key) {
              return key === scope.options.tagOptions.selectedTagIndex;
            };

            scope.resetSelectedTag = function() {
              scope.options.tagOptions.selectedTagIndex = null;
            };

            scope.isSelectedOption = function(key) {
              return key === scope.options.autoCompleteOptions.selectedOptionIndex;
            };

            scope.resetSelectedOption = function() {
              scope.options.autoCompleteOptions.selectedOptionIndex = 0;
            };

            scope.mouseUp = function($event) {
              if(scope.options.selectOnFocus === true) {
                $(element).find('input.display').select();
              }
            };

            //handles preventing default actions for input
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
                      scope.model[scope.modelController.$name] = '';
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

                if(scope.options.autoCompleteOptions.allowFreeForm !== true && scope.model[scope.modelController.$name] == '') {
                  scope.resetValues();
                }

                scope.options.autoCompleteOptions.selectedOptionIndex = null;
                scope.options.autoCompleteOptions.options = defaultAutoCompleteOptions;
              }

              scope.isActive = false;
            };

            scope.focus = function($event) {
              if(scope.options.autoCompleteOptions.enabled === true) {
                scope.options.autoCompleteOptions.selectedOptionIndex = 0;
                displayAutoComplete();
              }

              scope.isActive = true;
            };

            scope.doubleClick = function($event, value) {
              if(scope.options.tagOptions.doubleClickEdit === true) {
                scope.removeValue(value);
                $(element).find('input.display').val(value);
              }
            };

            scope.ulClick = function($event) {
              $event.stopPropagation();
              element.find('input.display').focus();
            };

            var hiddenValueSet = false;
            scope.$watch('options.data', function(newValue, oldValue) {
              $timeout(function(){
                if(scope.model) {
                  scope.model[scope.modelController.$name] = scope.getHiddenValue();
                }

                var hiddenValue = scope.getHiddenValue();
//                element.find('input[type="hidden"]').val(scope.getHiddenValue());
                element.find('input[type="hidden"]').val(scope.getHiddenValue());
                element.find('input.display').val(scope.getVisibleValue());

                if(hiddenValue != '' && hiddenValueSet === true) {
                  scope.modelController.$setViewValue(scope.getHiddenValue());
                }

                hiddenValueSet = true;
                updateTextAreaPadding();
                updateAutoCompletePosition();
                //setElementHeight();
              }, 0);
            }, true);

            scope.$watch('options.autoCompleteOptions.options', function(newValue, oldValue) {
              $timeout(function(){
                updateAutoCompletePosition();
              }, 0);
            }, true);

            //setElementHeight();
          }
        };
      }
    }
  }
]);
