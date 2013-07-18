module.exports = createWrapper

var Q = require('q')
  , wrappers = require('./wrappers')

function createWrapper(collection) {
	return new Collection(collection)
}

function Collection(collection) {
	this.wrapped = this.coll = collection
}

[ 'find'
].forEach(wrappers.wrapAndMakeCursor, Collection.prototype)

Object.defineProperty(Collection.prototype, 'hint',
{ enumerable: true
, get: function() { return this.coll.hint }
, set: function(v) { this.coll.hint = v }
})

;['insert'
, 'remove'
, 'rename'
, 'save'
, 'update'
, 'distinct'
, 'count'
, 'drop'
, 'findOne'
, 'findAndModify'
, 'findAndRemove'
, 'createIndex'
, 'ensureIndex'
, 'indexInformation'
, 'dropIndex'
, 'dropAllIndexes'
, 'dropIndexes'
, 'reIndex'
, 'mapReduce'
, 'group'
, 'options'
, 'isCapped'
, 'indexExists'
, 'geoNear'
, 'geoHaystackSearch'
, 'indexes'
, 'aggregate'
, 'stats'
].forEach(wrappers.wrap, Collection.prototype)
