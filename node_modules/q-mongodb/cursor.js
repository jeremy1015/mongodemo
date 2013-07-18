module.exports = wrapCursor

var Q = require('q')
  , wrappers = require('./wrappers')

function wrapCursor(cursor) {
	return new Cursor(cursor)
}

function Cursor(cursor) {
	this.wrapped = this.cursor = cursor
}

;[ 'each'
, 'formattedOrderClause'
, 'formatSortValue'
, 'streamRecords'
, 'stream'
, 'isClosed'
, 'rewind'
].forEach(wrappers.wrapAndCallThrough, Cursor.prototype)

;[ 'toArray'
, 'count'
, 'sort'
, 'limit'
, 'setReadPreference'
, 'skip'
, 'batchSize'
, 'nextObject'
, 'explain'
, 'close'
].forEach(wrappers.wrap, Cursor.prototype)
