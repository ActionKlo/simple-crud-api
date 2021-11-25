const person = require('../services/person')

exports.put = (req, res) => {
	const url = req.url

	switch (url) {
		case url.match(/\/person\/([0-9a-f]+\-?)+/) !==  null ? url.match(/\/person\/([0-9a-f]+\-?)+/)[0] : 0:
			person.put(req, res)
			break
	
		default:
			res.setStatus = 404
			res.end(JSON.stringify({ Error: "Page not found"}))
			break
	}
}