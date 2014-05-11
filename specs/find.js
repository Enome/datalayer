/*global describe, beforeEach, it*/

var should = require('should');
var rerequire = require('rerequire');
var utils = require('./utils');

describe('Query', function () {

  var dal, expected, doc;

  beforeEach(function () {
    dal = rerequire('../index', utils.mockRequires(), utils.mockGlobals())();
    expected = utils.expected();
  });

  describe('Find', function () {

    it('returns undefined if doc of that type exists', function () {

      (typeof dal.find('blades', 1) === 'undefined')
        .should
        .eql(true);
      
    });

    it('returns undefined if doc wasnt found', function () {

      (typeof dal.find('snowboard', 2) === 'undefined')
        .should
        .eql(true);
      
    });

    it('returns the found doc', function () {

      doc = dal.add('snowboard', { name: 'blue board'});

      should(dal.find('snowboard', 1))
        .eql(expected);
      
    });

    it('returns a doc which doesnt reference to the doc in _store', function () {

      doc = dal.add('snowboard', { name: 'blue board'});

      (dal.find('snowboard', 1) !== dal._store.snowboard[0])
        .should
        .eql(true);
      
    });

  });

  describe('FindAll', function () {

    describe('default', function () {

      it('returns empty array if no document is stored', function () {
        should(dal.findAll()).eql([]);
      });

      it('returns all the items', function () {

        dal.add('snowboard', { name: 'red board'});
        dal.add('skateboard', { name: 'blue board'});

        should(dal.findAll()).eql([
          {
            _id: 1,
            name: 'red board',
            type: 'snowboard',
            date_created: { value: 1 },
            date_modified: { value: 2 },
          },
          {
            _id: 2,
            name: 'blue board',
            type: 'skateboard',
            date_created: { value: 3 },
            date_modified: { value: 4 },
          },
        ]);
        
      });
        
    });

    describe('by type', function () {

      it('returns empty array if no document is stored', function () {
        should(dal.findAll('snowboard')).eql([]);
      });

      it('returns all the items by type', function () {

        dal.add('snowboard', { name: 'red board'});
        dal.add('snowboard', { name: 'blue board'});

        should(dal.findAll('snowboard')).eql([
          {
            _id: 1,
            name: 'red board',
            type: 'snowboard',
            date_created: { value: 1 },
            date_modified: { value: 2 },
          },
          {
            _id: 2,
            name: 'blue board',
            type: 'snowboard',
            date_created: { value: 3 },
            date_modified: { value: 4 },
          },
        ]);
        
      });
      
    });

    it('returns a copy of the docs and not a reference to them', function () {

      dal.add('snowboard', { name: 'red board'});
      dal.add('skateboard', { name: 'blue board'});

      var result = dal.findAll();

      (result[0] !== dal._store.snowboard[0])
        .should
        .eql(true);

    });

  });

});
