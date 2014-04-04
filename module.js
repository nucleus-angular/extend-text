/**
 * # Extend Text
 * 
 * An enhanced input element that add support for the following functionality:
 *
 * - Auto Complete
 * - Tagging
 *
 * @module nag.extendText
 */
angular.module('nag.extendText', [
  'nag.core',
  'nag.beat',
  'nag.event',
  'nag.form'
])
.run([
  'nagDefaults',
  function(nagDefaults) {
    /**
     * @ignore Properties definations for extend text directive 
     *
     * @ngdirective nagExtendText
     */
    /**
     * Options
     *
     * @ngscope
     * @property {object} options
     *   @property {boolean} [selectOnFocus=false] Whether or not to select of data when focusing on input
     *   @property {boolean} [preventSubmitOnEnter=true] Whether or not the prevent form submission on the enter key when input focused
     *   @property {array} [data] The data for the input
     *   @property {string} [templateUrl="extend-text.html"] Main template url
     *   @property {string} [template=""] Template HTML
     */
    nagDefaults.setOptions('extendText', {
      selectOnFocus: false, //whether or not to select the existing text in the input when focusing
      preventSubmitOnEnter: true,
      data: [],
      templateUrl: 'nucleus-angular-extend-text/assets/templates/extend-text.html',
      template: null
    });

    /**
     * Tagging Options
     *
     * @ngscope
     * @property {object} options.tagOptions
     *   @property {boolean} [enabled=false] Whether or not tagging is enabled
     *   @property {boolean} [allowDuplicates=false] Whether or not to allow duplicate values
     *   @property {number} [enabled=null] The index (zero-based) or the currently selected name
     *   @property {boolean} [doubleClickEdit=false] Whether or not to enable tag editing on double click
     */
    nagDefaults.setOptions('extendTextTagOptions', {
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
     *   @property {boolean} [selectOnBlur=true] Selected the currently highlighted option when blurring on the input
     *   @property {null|function} [setValue=true]
     *   Function that can be used to modify data before it is set to the inputs (returns an object with display and value property)
     *   @property {boolean} [allowFreeForm=false]
     *   Allow the user to enter in free form text (does not have to match something in the auto complete)
     *   @property {function} [generateDataUrl]
     *   Generate the URL used to retrieve the auto complete data form the remote service
     *   @property {null|function} [getData] Retrieve and set the data for the auto complete
     *   @property {string} [remoteDataMethod="GET"] HTTP method to use when requesting data from the remote service
     *   @property {boolean} [loadingData=false] Whether or not to display the loaded data message
     *   @property {function} [responseParser] Function to parse the response when retrieving the auto complete data
     *   @property {function} [formatVariable] Function used to format the variable when generating the URL
     *   @property {function} [filter] Function to use to filter the data when cache is set to true
     */
    nagDefaults.setOptions('extendTextAutoCompleteOptions', {
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
      setValue: null,
      allowFreeForm: false,
      freeFormIndicator: 'text',
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
      getaData: null,
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

    nagDefaults.setOptionsGetter('extendTextOptions', function(options) {
      var extendTextDefaults = nagDefaults.getOptions('extendText');
      var extendTextTagDefaults = nagDefaults.getOptions('extendTextTagOptions');
      var extendTextAutoCompleteDefaults = nagDefaults.getOptions('extendTextAutoCompleteOptions');

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
    });
  }
]);