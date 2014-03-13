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

    dal
      .add('snowboard', { name: 'blue board'})
      .should
      .eql(expected);

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
