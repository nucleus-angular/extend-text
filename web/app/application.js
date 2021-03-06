angular.module('demo', [
  'nag.extendText',
  'httpMocker',
  'demo.core',
  'demo.home',
  'nag.svg',
  'nag.autoFocus'
])
.config([
  '$locationProvider',
  '$urlRouterProvider',
  function($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/empty');
  }
])
.value('nagFormInvalidIconPath', '/components/nucleus-angular-sass-framework/assets/svg/open-iconic/svg/x.svg')
.value('nagFormValidIconPath', '/components/nucleus-angular-sass-framework/assets/svg/open-iconic/svg/check.svg')
.run([
  '$state',
  '$rootScope',
  'httpMocker',
  function($state, $rootScope, httpMocker) {
    httpMocker.register('GET', '/api/users?input=use', JSON.stringify({
      users: [{
        "id": 1,
        "username": "user1"
      },{
        "id": 2,
        "username": "user2"
      },{
        "id": 3,
        "username": "user3"
      },{
        "id": 4,
        "username": "user4"
      },{
        "id": 5,
        "username": "user5"
      }]
    }));
    httpMocker.register('GET', '/api/test?input=tes', JSON.stringify([{
      "display": "test1",
      "value": 1
    },{
      "display": "test2",
      "value": 2
    },{
      "display": "test3",
      "value": 3
    },{
      "display": "test4",
      "value": 4
    },{
      "display": "test5",
      "value": 5
    }]));
    httpMocker.register('GET', '/api/test?input=dataloading', JSON.stringify([]), {
      delay: 5000
    });
    httpMocker.register('GET', '/api/number-value?input=tes', JSON.stringify([{
      "display": "test1",
      "value": 1
    },{
      "display": "test2",
      "value": 2
    },{
      "display": "test3",
      "value": 3
    },{
      "display": "test4",
      "value": 4
    },{
      "display": "test5",
      "value": 5
    }]));
    httpMocker.register('GET', '/api/string-value?input=tes', JSON.stringify([{
      "display": "test1",
      "value": 't1'
    },{
      "display": "test2",
      "value": 't2'
    },{
      "display": "test3",
      "value": 't3'
    },{
      "display": "test4",
      "value": 't4'
    },{
      "display": "test5",
      "value": 't5'
    }]));
    httpMocker.register('GET', '/api/test?var=varname', JSON.stringify([{
      "display": "varname1",
      "value": 1
    },{
      "display": "varname2",
      "value": 2
    }]));
    httpMocker.register('GET', '/api/test?input=varformat%', JSON.stringify([{
      "display": "varformat1",
      "value": 1
    },{
      "display": "varformat2",
      "value": 2
    }]));
    httpMocker.register('POST', '/api/test?input=tes', JSON.stringify([{
      "display": "test1",
      "value": 1
    },{
      "display": "test2",
      "value": 2
    }]));
    httpMocker.register('GET', '/api/urlgen/t?input=url', JSON.stringify([{
      "display": "urlgen1",
      "value": 1
    },{
      "display": "urlgen2",
      "value": 2
    }]));
    httpMocker.register('GET', '/api/search-delay?input=searchdelay', JSON.stringify([{
      "display": "searchdelay1",
      "value": 1
    },{
      "display": "searchdelay2",
      "value": 2
    }]));
    httpMocker.register('GET', '/api/select-on-blur?input=selectblur', JSON.stringify([{
      "display": "selectblur1",
      "value": 1
    },{
      "display": "selectblur2",
      "value": 2
    }]));
    httpMocker.register('GET', '/api/freeform?input=freeform', JSON.stringify([{
      "value": 1,
      "display": "freeform1"
    },{
      "value": 2,
      "display": "freeform2"
    },{
      "value": 3,
      "display": "freeform3"
    },{
      "value": 4,
      "display": "freeform4"
    },{
      "value": 5,
      "display": "freeform5"
    }]));
    httpMocker.register('GET', '/api/delay?input=del', JSON.stringify([{
      "value": 1,
      "display": "delay1"
    },{
      "value": 2,
      "display": "delay2"
    },{
      "value": 3,
      "display": "delay3"
    },{
      "value": 4,
      "display": "delay4"
    },{
      "value": 5,
      "display": "delay5"
    }]));
    httpMocker.register('GET', '/api/custom-url?customUrl=cus', JSON.stringify([{
      "value": 1,
      "display": "custom url1"
    },{
      "value": 2,
      "display": "custom url2"
    },{
      "value": 3,
      "display": "custom url3"
    },{
      "value": 4,
      "display": "custom url4"
    },{
      "value": 5,
      "display": "custom url5"
    }]));
    httpMocker.register('GET', '/api/test?firstName=', JSON.stringify([{
      "display": "kim",
      "value": "kim"
    },{
      "display": "john",
      "value": "john"
    }]));
    httpMocker.register('GET', '/api/test?firstName=k', JSON.stringify([{
      "display": "kim",
      "value": "kim"
    }]));
    httpMocker.register('GET', '/api/test?lastName=', JSON.stringify([{
      "display": "doe",
      "value": "doe"
    },{
      "display": "smith",
      "value": "smith"
    }]));
    httpMocker.register('GET', '/api/test?lastName=d', JSON.stringify([{
      "display": "doe",
      "value": "doe"
    }]));
    httpMocker.register('GET', '/api/test?username=', JSON.stringify([{
      "display": "kim.doe",
      "value": 'kim.doe'
    },{
      "display": "john.smith",
      "value": 'john.smith'
    }]));
    httpMocker.register('GET', '/api/test?username=k', JSON.stringify([{
      "display": "kim.doe",
      "value": 'kim.doe'
    }]));
  }
]);
