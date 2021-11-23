const person = require('../services/person')

exports.get = (req, res) => {
	const url = req.url

	switch (url) {
		case "/person":
		case "/person/":
			person.getAll(req, res)
			break
		case url.match(/\/person\/([0-9a-f]+\-?)+/) !==  null ? url.match(/\/person\/([0-9a-f]+\-?)+/)[0] : 0:
			person.getById(req, res)
			break
		default:
			res.setStatus = 404
			res.end(JSON.stringify({ Error: "Page not found"}))
			break
	}
}