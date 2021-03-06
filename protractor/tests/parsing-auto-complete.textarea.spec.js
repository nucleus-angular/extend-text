//full auto complete options lists
var identifiers = [
  {display: 'firstName', value: 'firstName'},
  {display: 'lastName', value: 'lastName'},
  {display: 'username', value: 'username'},
  {display: 'createdTimestamp', value: 'createdTimestamp'}
];
var comparisons = [
  {display: '=', value: '='},
  {display: '!=', value: '!='},
  {display: '>', value: '>'},
  {display: '>=', value: '>='},
  {display: '<', value: '<'},
  {display: '<=', value: '<='},
  {display: 'in', value: 'in'},
  {display: 'not in', value: 'not in'},
  {display: 'between', value: 'between'},
  {display: 'not between', value: 'not between'},
  {display: 'is null', value: 'is null'},
  {display: 'is not null', value: 'is not null'},
  {display: 'like', value: 'like'}
];
var connectors = [
  {display: 'and', value: 'and'},
  {display: 'or', value: 'or'}
];
var values = {
  firstName: [
    {display: 'kim', value: 'kim'},
    {display: 'john', value: 'john'}
  ],
  lastName: [
    {display: 'doe', value: 'doe'},
    {display: 'smith', value: 'smith'}
  ],
  username: [
    {display: 'kim.doe', value: 'kim.doe'},
    {display: 'john.smith', value: 'john.smith'}
  ]
};

describe('parsing auto complete (textarea)', function() {
  before(function() {
    this.genericPage = require('../lib/page/generic');
  });

  it("should work with complex queries manually entered", function() {
    var page = this.genericPage.create('parsing-with-auto-complete');
    var extendTextComponent = page.getExtendTextComponent(true);

    extendTextComponent.type("(");

    extendTextComponent.hasAutoCompleteOptions(identifiers);

    extendTextComponent.type("firstName ");

    extendTextComponent.hasAutoCompleteOptions(comparisons);

    extendTextComponent.type("= ", true);

    extendTextComponent.hasAutoCompleteOptions(values.firstName);

    extendTextComponent.type("john ");

    extendTextComponent.hasAutoCompleteOptions(connectors);

    extendTextComponent.type("or ");

    extendTextComponent.hasAutoCompleteOptions(identifiers);

    extendTextComponent.type("(");

    extendTextComponent.hasAutoCompleteOptions(identifiers);

    extendTextComponent.type("lastName ");

    extendTextComponent.hasAutoCompleteOptions(comparisons);

    extendTextComponent.type("in(", true);

    extendTextComponent.hasAutoCompleteOptions(values.lastName);

    extendTextComponent.type("'doe', ", true);

    extendTextComponent.hasAutoCompleteOptions(values.lastName);

    extendTextComponent.type("smith)");

    extendTextComponent.autoCompleteHidden();

    extendTextComponent.type(")");

    extendTextComponent.autoCompleteHidden();

    extendTextComponent.type(") ");

    extendTextComponent.hasAutoCompleteOptions(connectors);

    extendTextComponent.type("and ");

    extendTextComponent.hasAutoCompleteOptions(identifiers);

    extendTextComponent.type("username ");

    extendTextComponent.hasAutoCompleteOptions(comparisons);

    extendTextComponent.type("like ", true);

    extendTextComponent.hasAutoCompleteOptions(values.username);

    extendTextComponent.type("'%smith' ");

    extendTextComponent.hasAutoCompleteOptions(connectors);

    extendTextComponent.type("or ");

    extendTextComponent.hasAutoCompleteOptions(identifiers);

    extendTextComponent.type("createdTimestamp ");

    extendTextComponent.hasAutoCompleteOptions(comparisons);

    extendTextComponent.type("not between ");

    extendTextComponent.autoCompleteHidden();

    extendTextComponent.type("'2014-01-01 00:00:00' ");

    extendTextComponent.hasAutoCompleteOptions([{
      display: 'and',
      value: 'and'
    }]);

    extendTextComponent.type("and ");

    extendTextComponent.autoCompleteHidden();

    extendTextComponent.type("'2014-02-01 00:00:00'");

    extendTextComponent.displayValueIs("(firstName = john or (lastName in('doe', smith))) and username like '%smith' or createdTimestamp not between '2014-01-01 00:00:00' and '2014-02-01 00:00:00'");
  });

  describe('auto complete', function() {
    it("should show auto complete when focusing on input with a partial query there", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName = k");
      extendTextComponent.clickBody();

      extendTextComponent.autoCompleteHidden();

      extendTextComponent.clickInput();

      extendTextComponent.hasAutoCompleteOptions([{
        display: 'kim',
        value: 'kim'
      }]);
    });

    it("should show auto complete even when cursor is not at the end of the query", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName = kim and lastName = " + page.repeatKeys(protractor.Key.ARROW_LEFT, 11));

      extendTextComponent.hasAutoCompleteOptions(identifiers);
    });

    it("should work with complex queries using auto complete", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("(");

      extendTextComponent.hasAutoCompleteOptions(identifiers);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(" ");

      extendTextComponent.hasAutoCompleteOptions(comparisons);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(" ", true);

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.clickAutoCompleteItem(2);
      extendTextComponent.type(" ");

      extendTextComponent.hasAutoCompleteOptions(connectors);

      extendTextComponent.clickAutoCompleteItem(2);
      extendTextComponent.type(" ");

      extendTextComponent.hasAutoCompleteOptions(identifiers);

      extendTextComponent.type("(");

      extendTextComponent.hasAutoCompleteOptions(identifiers);

      extendTextComponent.clickAutoCompleteItem(2);
      extendTextComponent.type(" ");

      extendTextComponent.hasAutoCompleteOptions(comparisons);

      extendTextComponent.clickAutoCompleteItem(7);
      extendTextComponent.type("('", true);

      extendTextComponent.hasAutoCompleteOptions(values.lastName);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type("', ", true);

      extendTextComponent.hasAutoCompleteOptions(values.lastName);

      extendTextComponent.clickAutoCompleteItem(2);
      extendTextComponent.type(")");

      extendTextComponent.autoCompleteHidden();

      extendTextComponent.type(")");

      extendTextComponent.autoCompleteHidden();

      extendTextComponent.type(") ");

      extendTextComponent.hasAutoCompleteOptions(connectors);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(" ");

      extendTextComponent.hasAutoCompleteOptions(identifiers);

      extendTextComponent.clickAutoCompleteItem(3);
      extendTextComponent.type(" ");

      extendTextComponent.hasAutoCompleteOptions(comparisons);

      extendTextComponent.clickAutoCompleteItem(13);
      extendTextComponent.type(" ", true);

      extendTextComponent.hasAutoCompleteOptions(values.username);

      extendTextComponent.type("'%smith' ");

      extendTextComponent.hasAutoCompleteOptions(connectors);

      extendTextComponent.clickAutoCompleteItem(2);
      extendTextComponent.type(" ");

      extendTextComponent.hasAutoCompleteOptions(identifiers);

      extendTextComponent.clickAutoCompleteItem(4);
      extendTextComponent.type(" ");

      extendTextComponent.hasAutoCompleteOptions(comparisons);

      extendTextComponent.clickAutoCompleteItem(10);
      extendTextComponent.type(" ");

      extendTextComponent.autoCompleteHidden();

      extendTextComponent.type("'2014-01-01 00:00:00' ");

      extendTextComponent.hasAutoCompleteOptions([{
        display: 'and',
        value: 'and'
      }]);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(" ");

      extendTextComponent.autoCompleteHidden();

      extendTextComponent.type("'2014-02-01 00:00:00'");

      extendTextComponent.displayValueIs("(firstName = john or (lastName in('doe', smith))) and username like '%smith' or createdTimestamp not between '2014-01-01 00:00:00' and '2014-02-01 00:00:00'");
    });
  });

  describe('identifiers', function() {
    it("should show list of identifiers on initial focus", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.clickInput();

      extendTextComponent.hasAutoCompleteOptions(identifiers);
    });

    it("should show list of comparison options when identifier is fielded out", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type('firstName ');

      extendTextComponent.hasAutoCompleteOptions(comparisons);

      extendTextComponent.type(page.repeatKeys(protractor.Key.BACK_SPACE, 2) + ' ');

      extendTextComponent.hasAutoCompleteOptions(comparisons);
    });

    it("should show list of identifiers after connector has been entered", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName = kim and ");

      extendTextComponent.hasAutoCompleteOptions(identifiers);
    });

    it("should replace the current token when select an item from the auto complete for identifier", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("f");
      extendTextComponent.clickAutoCompleteItem(1);

      extendTextComponent.autoCompleteHidden();
      extendTextComponent.displayValueIs('firstName');
    });
  });

  describe('incomplete quoted values', function() {

    it("should filter auto complete with partial value without ending quote", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName = 'k ");

      extendTextComponent.hasAutoCompleteOptions([
        {display: 'kim', value: 'kim'}
      ]);
    });

    it("should not show list of connectors after value has been entered without ending quote", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName = 'kim ");

      extendTextComponent.autoCompleteHidden();
    });
  });

  describe('comparisons', function() {
    it("should support auto complete for comparisons", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName ");

      extendTextComponent.hasAutoCompleteOptions(comparisons);

      extendTextComponent.type('=');

      extendTextComponent.hasAutoCompleteOptions([{
        display: '=',
        value: '='
      }, {
        display: '!=',
        value: '!='
      }, {
        display: '>=',
        value: '>='
      }, {
        display: '<=',
        value: '<='
      }]);

      extendTextComponent.type(protractor.Key.BACK_SPACE + 'i');

      extendTextComponent.hasAutoCompleteOptions([{
        display: 'in',
        value: 'in'
      }, {
        display: 'not in',
        value: 'not in'
      }, {
        display: 'is null',
        value: 'is null'
      }, {
        display: 'is not null',
        value: 'is not null'
      }, {
        display: 'like',
        value: 'like'
      }]);

      extendTextComponent.type('s ');

      extendTextComponent.hasAutoCompleteOptions([{
        display: 'is null',
        value: 'is null'
      }, {
        display: 'is not null',
        value: 'is not null'
      }]);

      extendTextComponent.type('n');

      extendTextComponent.hasAutoCompleteOptions([{
        display: 'is null',
        value: 'is null'
      }, {
        display: 'is not null',
        value: 'is not null'
      }]);

      extendTextComponent.type('ot ');

      extendTextComponent.hasAutoCompleteOptions([{
        display: 'is not null',
        value: 'is not null'
      }]);

      extendTextComponent.type('n');

      extendTextComponent.hasAutoCompleteOptions([{
        display: 'is not null',
        value: 'is not null'
      }]);

      extendTextComponent.type('ull');

      extendTextComponent.autoCompleteHidden();
    });

    it("should support the '=' comparison", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName = ");

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions(connectors);
      extendTextComponent.displayValueIs('firstName = kim ');
    });

    it("should support the '!=' comparison", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName != ");

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions(connectors);
      extendTextComponent.displayValueIs('firstName != kim ');
    });

    it("should support the '>' comparison", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName > ");

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions(connectors);
      extendTextComponent.displayValueIs('firstName > kim ');
    });

    it("should support the '>=' comparison", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName >= ");

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions(connectors);
      extendTextComponent.displayValueIs('firstName >= kim ');
    });

    it("should support the '<' comparison", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName < ");

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions(connectors);
      extendTextComponent.displayValueIs('firstName < kim ');
    });

    it("should support the '<=' comparison", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName <= ");

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions(connectors);
      extendTextComponent.displayValueIs('firstName <= kim ');
    });

    it("should support the 'in' comparison", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName in(");

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.type(protractor.Key.BACK_SPACE + ' (');

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.type('k');

      extendTextComponent.hasAutoCompleteOptions([{
        display: 'kim',
        value: 'kim'
      }]);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(',');

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.clickAutoCompleteItem(2);
      extendTextComponent.type(') ');

      extendTextComponent.hasAutoCompleteOptions(connectors);
      extendTextComponent.displayValueIs('firstName in (kim, john) ');
    });

    it("should support the 'not in' comparison", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName not in(");

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.type(protractor.Key.BACK_SPACE + ' (');

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.type('k');

      extendTextComponent.hasAutoCompleteOptions([{
        display: 'kim',
        value: 'kim'
      }]);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(',');

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.clickAutoCompleteItem(2);
      extendTextComponent.type(') ');

      extendTextComponent.hasAutoCompleteOptions(connectors);
      extendTextComponent.displayValueIs('firstName not in (kim, john) ');
    });

    it("should support the 'between' comparison", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName between ");

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions([{
        display: 'and',
        value: 'and'
      }]);

      extendTextComponent.clickAutoCompleteItem(1);

      extendTextComponent.autoCompleteHidden();

      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.clickAutoCompleteItem(2);
      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions(connectors);
      extendTextComponent.displayValueIs('firstName between kim and john ');
    });

    it("should support the 'not between' comparison", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName not between ");

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions([{
        display: 'and',
        value: 'and'
      }]);

      extendTextComponent.clickAutoCompleteItem(1);

      extendTextComponent.autoCompleteHidden();

      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.clickAutoCompleteItem(2);
      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions(connectors);
      extendTextComponent.displayValueIs('firstName not between kim and john ');
    });

    it("should support the 'is null' comparison", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName is null ");

      extendTextComponent.hasAutoCompleteOptions(connectors);
      extendTextComponent.displayValueIs('firstName is null ');
    });

    it("should support the 'is not null' comparison", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName is not null ");

      extendTextComponent.hasAutoCompleteOptions(connectors);
      extendTextComponent.displayValueIs('firstName is not null ');
    });

    it("should support the 'like' comparison", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName like ");

      extendTextComponent.hasAutoCompleteOptions(values.firstName);

      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(' ');

      extendTextComponent.hasAutoCompleteOptions(connectors);
      extendTextComponent.displayValueIs('firstName like kim ');
    });
  });

  describe('replacing tokens', function() {
    it("should replace the current token when select an item from the auto complete for comparison", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName !");
      extendTextComponent.clickAutoCompleteItem(1);

      extendTextComponent.autoCompleteHidden();
      extendTextComponent.displayValueIs('firstName !=');
    });

    it("should replace the current token when select an item from the auto complete for value", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName = k");
      extendTextComponent.clickAutoCompleteItem(1);

      extendTextComponent.autoCompleteHidden();
      extendTextComponent.displayValueIs('firstName = kim');
    });

    it("should replace the current token when select an item from the auto complete for connector", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName = kim o");
      extendTextComponent.clickAutoCompleteItem(1);

      extendTextComponent.autoCompleteHidden();
      extendTextComponent.displayValueIs('firstName = kim or');
    });

    it("should properly reposition cursor when replace a value that is the same that is currently there", function() {
      var page = this.genericPage.create('parsing-with-auto-complete');
      var extendTextComponent = page.getExtendTextComponent(true);

      extendTextComponent.type("firstName in(kim,smith" + page.repeatKeys(protractor.Key.ARROW_LEFT, 9), true);
      extendTextComponent.clickAutoCompleteItem(1);
      extendTextComponent.type(",test", true);

      extendTextComponent.displayValueIs('firstName in(kim,test,smith');
    });
  });
});
