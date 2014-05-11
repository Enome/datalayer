var uuid = require('uuid');
var EventEmitter = require('events').EventEmitter;

var clientDal = function () {

  var ee = new EventEmitter();

  var copy = function (i) {
    return JSON.parse(JSON.stringify(i));
  };

  var dal = {

    _store: {},

    // Bind EventEmitter

    emit: ee.emit.bind(ee),
    on: ee.on.bind(ee),
    removeListener: ee.removeListener.bind(ee),
  

    // Add -->
    
    add: function (type, doc) {

      if (typeof dal._store[type] === 'undefined') {
        dal._store[type] = []; 
      }

      doc._id = uuid.v4();
      doc.type = type;
      doc.date_created = new Date();
      doc.date_modified = new Date();

      dal._store[type].push(doc);
      dal.emit('change', 'add', doc);

      return copy(doc);

    },


    // Remove -->

    remove: function (type, id) {

      var doc;
      var store = dal._store[type];

      for (var i = 0; i < store.length; i += 1) {

        doc = store[i];

        if (doc._id === id) {
          store.splice(i, 1);
          break;
        }
      
      }
      
      dal.emit('change', 'remove', doc);

      return doc;

    },


    // Find -->

    _find: function (type, id) {
      
      var store = dal._store[type];

      if (typeof dal._store[type] === 'undefined') {
        return undefined;
      }

      for (var i = 0; i < store.length; i ++) {

        var v = store[i];

        if (v._id === id) {
          return v; 
        }

      }

      return undefined;

    },

    find: function (type, id) {

      var found = dal._find(type, id);
      return typeof found === 'undefined' ? undefined : copy(found);
      
    },

    
    // Find All

    findAll: function () {

      var result = [];
      
      // Default

      if (arguments.length === 0) {
        for (var prop in dal._store) {
          if (dal._store.hasOwnProperty(prop)) {
            result.push.apply(result, dal._store[prop]);
          }
        }
      }

      // By Type

      if (typeof arguments[0] === 'string') {
        result.push.apply(result, dal._store[arguments[0]] || []);
      }

      return copy(result);

    },


    // Update -->
    
    update: function (type, id, attributes) {

      var doc = dal._find(type, id);

      for (var prop in attributes) {
        if (attributes.hasOwnProperty(prop)) {
          doc[prop] = attributes[prop];
        }
      }

      doc.date_modified = new Date();

      dal.emit('change', 'update', doc);

      return doc;
    
    },


  };

  return dal;

};

module.exports = clientDal;
