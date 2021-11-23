const { randomUUID } = require('crypto')
const person = require('../services/person')

exports.post = (req, res) => {
	const url = req.url
	console.log(randomUUID())

	// if (url.split('/').length == 2) 

	// let uuid = url.split('/')[2]
	// console.log(uuid)
	// console.log(uuid.match(/\/person\/([0-9a-f]+\-?)+/))
	// if (url.match(/\/person\/([0-9a-f]+\-?)+/)) {
	// 	console.log(url.match(/\/person\/([0-9a-f]+\-?)+/))
	// 	console.log("if " + url)
	// 	res.end()
	// }

	switch (url) {
		case '/person':
			person.create(req, res)
			break;
	
		default:
			break;
	}
}