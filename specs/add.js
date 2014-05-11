/*global describe, beforeEach, it*/

var should = require('should');
var rerequire = require('rerequire');
var utils = require('./utils');

describe('Add', function () {

  var dal, expected;

  beforeEach(function () {
    dal = rerequire('../index', utils.mockRequires(), utils.mockGlobals())();
    expected = utils.expected();
  });

  it('adds an item to the storage', function () {
    dal.add('snowboard', { name: 'blue board'});
    should(dal._store).eql({ snowboard: [ expected ]});
  });

  it('returns the newly created document', function () {

    should(dal.add('snowboard', { name: 'blue board'}))
      .eql(expected);

  });

  it('returns a copy of the doc instead of a real reference', function () {

    var doc = dal.add('snowboard', { name: 'blue board'});

    (doc !== dal._store.snowboard[0])
      .should
      .eql(true);

  });


  it('emits the change event returns the document', function (done) {

    dal.on('change', function (type, doc) {
      type.should.eql('add');
      doc.should.eql(expected);
      done();
    });

    dal.add('snowboard', { name: 'blue board'});
    
  });
    
});
