const { randomUUID } = require('crypto')
const person = require('../services/person')

exports.post = (req, res) => {
	const url = req.url
	
	switch (url) {
		case '/person':
			person.create(req, res)
			break;
	
		default:
			break;
	}
}