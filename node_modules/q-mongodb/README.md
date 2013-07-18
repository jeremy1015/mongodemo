Introduction
------------

This is a node.js module which wraps the
[mongodb module](https://github.com/mongodb/node-mongodb-native) with the
[q promises module](https://github.com/kriskowal/q).  It handles opening a db
(and maintaining the open db object) as well as accessing collections (creating
them if need be).

If you query for the same db multiple times during the lifetime of your node
app, you'll be handed the same open db object (unless you explicitly close the
db with a call to `closeAll()`).


This fork
---------

This fork takes a more drastic approach by wrapping the `Collection` and `Cursor`
objects as well, ensuring that all asynchronous mongo-operations are wrapped in
promises. The API is kept compatible with the `mongodb` npm package.

Generally, just replace all `mongodb` functions that take a callback with a
promise, with the only exception being `Cursor.each`, as it uses the callback
for iterating over the fetched objects.


Installation
------------

<span style=text-decoration:line-through>`npm install q-mongodb`</span>

The version offered by npm is based on the original repository and not this
fork.

To install this version, use `npm install git://github.com/fizker/QMongoDB.git`.

To install a specific version, use `git://github.com/fizker/QMongoDB.git#0.1.2`.


Usage
-----

    var QMongoDB = require('q-mongodb');

    QMongoDB.db('my_db')
        .invoke('collection', 'people')
        .then(function(collection) {
            // Perform standard collection operations here
        }).then(function() {
            return QMongoDB.closeAll();
        });

or you can use a connection string:

    var QMongoDB = require('q-mongodb');

    QMongoDB.connect('mongodb://user:pass@localhost:27017/')
        .invoke('collection', 'people')
        .then(function(collection) {
            // Perform standard collection operations here
        }).then(function() {
            return QMongoDB.closeAll();
        });

The collection and cursor is also wrapped for returning promises:

    collection.insert(data)
        .then(function() {
            return collection.find()
        })
        .invoke('toArray')
        .then(function(data) {
            // Do something with the data
            return collection.update(query, newData)
        })
        .then
