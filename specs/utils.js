var utils = {

  expected: function () { 
    return {
      name: 'blue board',
      _id: 1,
      type: 'snowboard',
      date_created: { value: 1 },
      date_modified: { value: 2 } 
    };
  },

  mockRequires: function () {

    var uuid = 0;

    return {
      'uuid': { v4: function () { uuid += 1; return uuid; }, },
    };

  },

  mockGlobals: function () {

    var date = 0;

    return {
      Date: function () {
        this.value = date += 1;
      },
    };

  },

};

module.exports = utils;
