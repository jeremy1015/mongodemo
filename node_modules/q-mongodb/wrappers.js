module.exports =
{ wrap: wrap
, wrapAndCallThrough: wrapAndCallThrough
, wrapAndMakeCursor: wrapAndMakeCursor
, wrapAndMakeCollection: wrapAndMakeCollection
}

var Q = require('q')
  , collection = require('./collection')
  , cursor = require('./cursor')


function wrap(method) {
	this[method] = function wrapped() {
		var self = this
		  , args = Array.prototype.slice.call(arguments)
		args.unshift(this.wrapped, method)
		return Q.ninvoke.apply(Q, args).then(function(args) {
			if(args !== undefined) {
				return args
			}
			return self
		})
	}
}

function wrapAndCallThrough(method) {
	this[method] = function wrapped() {
		return this.wrapped[method].apply(this.wrapped, arguments)
	}
}

function wrapAndMakeCursor(method) {
	this[method] = function wrapped() {
		var args = Array.prototype.slice.call(arguments)
		args.unshift(this.wrapped, method)
		return Q.ninvoke.apply(Q, args).then(cursor)
	}
}

function wrapAndMakeCollection(method) {
	this[method] = function wrapped() {
		var args = Array.prototype.slice.call(arguments)
		args.unshift(this.wrapped, method)
		return Q.ninvoke.apply(Q, args).then(collection)
	}
}
