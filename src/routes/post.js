const { randomUUID } = require('crypto')
const person = require('../services/person')

exports.post = (req, res) => {
	const url = req.url
	
	switch (url) {
		case '/person':
			person.create(req, res)
			break
	
		default:
			res.statusCode = 404
			res.end(JSON.stringify({ error: "Page not found"}))
			break
	}
}