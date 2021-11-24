const get = require('./get').get
const post = require('./post').post
const put = require('./put').put

exports.router = (req, res) => {
	let method = req.method
	
	switch (method) {
		case "GET":
			get(req, res)
			break;
		case "POST":
			post(req, res)
		case "PUT":
			put(req, res)		
		default:
			break;
	}
}