describe('integration/cursor.js', function() {
	var mongo = require('../../q-mongodb')
	  , collection
	beforeEach(function() {
		return mongo.db('q-mongodb-test').invoke('collection', 'test')
			.then(function(coll) {
				collection = coll
				return coll
			})
			.invoke('remove')
			.invoke('insert',
				[ { a: 1 }
				, { a: 2 }
				, { a: 3 }
				]
			)
	})
	describe('When calling find()', function() {
		it('should return a wrapped cursor', function() {
			return expect(collection.find())
				.to.eventually.include.key('wrapped')
		})
		it('should return three objects', function() {
			return expect(collection.find().invoke('toArray'))
				.to.eventually.approximate(
					[ { a: 1 }
					, { a: 2 }
					, { a: 3 }
					]
				)
		})
		it('should pass each() as expected', function(done) {
			var i = 0
			  , expected =
			    [ { a: 1 }
			    , { a: 2 }
			    , { a: 3 }
			    ]
			collection.find().invoke('each', function(err, obj) {
				// obj is null when all have been read
				if(obj === null) {
					expect(i).to.equal(3)
					return done()
				}
				expect(obj).to.approximate(expected[i++])
			})
		})
	})
})
