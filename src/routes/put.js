const person = require('../services/person')

exports.put = (req, res) => {
	const url = req.url

	switch (url) {
		case url.match(/\/person\/([\D\d]+)?/g) !==  null ? url.match(/\/person\/([\D\d]+)?/g)[0] : 0:
			person.put(req, res)
			break
	
		default:
			res.statusCode = 404
			res.end(JSON.stringify({ error: "Page not found"}))
			break
	}
}