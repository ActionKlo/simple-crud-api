const http = require('http')

const dotenv = require('dotenv')
const config = dotenv.config().parsed

exports.start = () => {
	let server = http.createServer((req, res) => {
		res.end("Hello world")
	})

	server.listen(config.DEV_PORT, () => {
		console.log(`Server started at port: ${config.DEV_PORT}`)
	})
}