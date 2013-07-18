module.exports = createWrapper

var Q = require('q')
  , wrappers = require('./wrappers')
  , collection = require('./collection')
  , cursor = require('./cursor')

function createWrapper(db) {
	return new Db(db)
}

function Db(db) {
	this.wrapped = this.db = db
}

Db.prototype.collections = function collections() {
	var args = Array.prototype.slice.call(arguments)
	args.unshift(this.db, 'collections')
	return Q.ninvoke.apply(Q, args).invoke('map', function(coll) {
		return collection(coll)
	})
}

;[ 'db'
].forEach(wrappers.wrapAndCallThrough, Db.prototype)

;[ 'collectionsInfo'
].forEach(wrappers.wrapAndMakeCursor, Db.prototype)

;[ 'collection'
, 'createCollection'
, 'renameCollection'
].forEach(wrappers.wrapAndMakeCollection, Db.prototype)

;[ 'stop'
, 'close'
, 'admin'
, 'collectionNames'
, 'eval'
, 'dereference'
, 'logout'
, 'authenticate'
, 'addUser'
, 'removeUser'
, 'command'
, 'dropCollection'
, 'lastError'
, 'error'
, 'lastStatus'
, 'previousErrors'
, 'executeDbCommand'
, 'execureDbAdminCommand'
, 'resetErrorHistory'
, 'createIndex'
, 'ensureIndex'
, 'cursorInfo'
, 'dropIndex'
, 'reIndex'
, 'indexInformation'
, 'dropDatabase'
, 'stats'
].forEach(wrappers.wrap, Db.prototype)
