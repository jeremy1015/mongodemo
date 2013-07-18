describe('integration/db.js', function() {
	var mongo = require('../../q-mongodb')
	describe('When connecting via url-string', function() {
		beforeEach(function() {
			return mongo.db('q-mongodb-test')
				.invoke('collection', 'test')
				.invoke('remove')
				.invoke('insert', { a: 1, b: 2 })
		})
		it('should open a connection', function() {
			return expect(
				mongo.connect('mongodb://localhost/q-mongodb-test')
					.invoke('collection', 'test')
					.invoke('findOne', { a: 1 })
			).to.eventually.approximate({ a: 1, b: 2 })
		})
	})
})
