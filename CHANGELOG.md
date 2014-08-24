# Change Log

Each change log are assumed to be accompanied by associated unit test and documentation updates.

## 0.6.0

- coverted from isolate scope to child scope
- added .editorconfig file
- added ability to set custom setValue() method for auto complete (#7)
- added ability to define custom getData() method for auto complete (#6)
- fixed issue with new indicator not work whe initial search for data returns nothing (#4)
- all tests now execute against both input and textarea elements (#3)
- refactored tests to be more maintainable
- added text parsing functionality
- refactored template so that transclusion is no longer need (data-type or lack of one defined determines if you get and input or textarea)
- fixed bug with reset hidden input value (#9)
- added test for form validation integration and fixed related issues

## 0.5.0

- added ability to be able to put free form new indicator in with the list of options
- initial release with change log file
