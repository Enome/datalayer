/*global describe, beforeEach, it*/

var rerequire = require('rerequire');
var utils = require('./utils');

describe('Remove', function () {

  var dal, expected, doc;

  beforeEach(function () {
    dal = rerequire('../index', utils.mockRequires(), utils.mockGlobals())();
    expected = utils.expected();
    doc = dal.add('snowboard', { name: 'blue board'});
  });

  it('removes the document by type and id', function () {
    dal.remove('snowboard', doc._id);
    dal._store.snowboard.length.should.eql(0);
  });

  it('returns the removed document', function () {
    dal.remove('snowboard', doc._id).should.eql(expected);
  });

  it('emits the change event (remove) returns the document', function (done) {
    dal.on('change', function (type, doc) {
      type.should.eql('remove');
      doc.should.eql(expected);
      done();
    });

    dal.remove('snowboard', doc._id).should.eql(expected);
  });

});
