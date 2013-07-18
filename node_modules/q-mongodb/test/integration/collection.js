describe('integration/collection.js', function() {
	var mongo = require('../../q-mongodb')
	describe('When calling findOne', function() {
		beforeEach(function() {
			return mongo.db('q-mongodb-test')
				.invoke('collection', 'test')
				.invoke('remove')
				.invoke('insert',
					[ { a: 1, b: 'a' }
					, { a: 2, b: 'b' }
					, { a: 3, b: 'c' }
					]
				)
		})
		it('should return the requested object', function() {
			return expect(mongo.db('q-mongodb-test')
				.invoke('collection', 'test')
				.invoke('findOne', { a: 2 })
			).to.eventually.approximate({ a: 2, b: 'b' })
		})
	})
})
