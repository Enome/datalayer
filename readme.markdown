# Data layer

Synch data layer with types and events.

- add(type, object)
- remove(type, id)
- update(type, id, attributes)
- find(type, id)
- findAll([type])

This uses CommonJS modules so use with browserify or Node.js

```js
var datalayer = require('datalayer');
var dal = datalayer();

dal.add('product', { name: 'snowboard' });
dal.remove('product', 'uuid');
dal.update('product', 'uuid', { name: 'skateboard' });

dal.find('product', 'uuid');

dal.findAll();
dal.findAll('product');
```

Tests

```sh
mocha -r should specs
```
