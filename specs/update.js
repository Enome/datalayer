/*global describe, beforeEach, it*/

var should = require('should');
var rerequire = require('rerequire');
var utils = require('./utils');

describe('Update', function () {

  var dal, expected, doc;

  beforeEach(function () {
    dal = rerequire('../index', utils.mockRequires(), utils.mockGlobals())();
    expected = utils.expected();
    doc = dal.add('snowboard', { name: 'blue board'});
  });

  var expected_update = {
    _id: 1,
    name: 'red board',
    type: 'snowboard',
    date_created: { value: 1 },
    date_modified: { value: 3 },
  };

  it('updates the properties you pass to update', function () {
    dal.update('snowboard', doc._id, { name: 'red board'});
    should(dal._store).eql({ snowboard: [expected_update] });
  });

  it('returns the newly updated doc', function () {
    dal
      .update('snowboard', doc._id, { name: 'red board'})
      .should
      .eql(expected_update);
  });

  it('emits the change event (update) returns the document', function (done) {
    dal.on('change', function (type, doc) {
      type.should.eql('update');
      doc.should.eql(expected_update);
      done();
    });
    dal.update('snowboard', doc._id, { name: 'red board'});
  });
  
});
