const GET = require('./get').get
const POST = require('./post').post
const PUT = require('./put').put
const DELETE = require('./delete').delete

exports.router = (req, res) => {
	let method = req.method
	
	switch (method) {
		case "GET":
			GET(req, res)
			break
		case "POST":
			POST(req, res)
			break
		case "PUT":
			PUT(req, res)
			break
		case "DELETE":
			DELETE(req, res)
			break
		default:
			res.statusCode = 400
			res.end(JSON.stringify({ error: "Unknow request method" }))
			break
	}
}