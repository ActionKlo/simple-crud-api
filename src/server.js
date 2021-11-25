const http = require('http')

const dotenv = require('dotenv')
const config = dotenv.config().parsed

const router = require('./routes').router

exports.start = () => {
	let server = http.createServer((req, res) => {
		res.setHeader('Content-Type', 'application/json')
		try {
			router(req, res)
		} catch (e) {
			res.statusCode = 500
			res.end(JSON.stringify({ error: "something went wrong" }))
		}
	})

	server.listen(config.DEV_PORT, () => {
		console.log(`Server started at port: ${config.DEV_PORT}`)
	})
}