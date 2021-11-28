const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
chai.use(chaiHttp)

const dotenv = require('dotenv')
const config = dotenv.config().parsed

const SERVER_URL = `${config.DEV_URL}:${config.DEV_PORT}`

describe('Test error requests', () => {
	it('Create person with out data', done => {
		chai
			.request(SERVER_URL)
			.post('/person')
			.send({})
			.end((err, res) => {
				if (err) {
					console.log(err)
				}

				res.should.have.status(400)
				res.body.should.deep.equal({ error: "Not enought data"})
				done()
			})
	})

	it('Get person by invalid id', done => {
		chai
			.request(SERVER_URL)
			.get('/person/invalid-id')
			.end((err, res) => {
				if (err) {
					console.log(err)
				}

				res.should.have.status(400)
				res.body.should.deep.equal({ error: "Invalid id" })
				done()
			})
	})

	it('Get 404', done => {
		chai
			.request(SERVER_URL)
			.get('/page/not/found')
			.end((err, res) => {
				if (err) {
					console.log(err)
				}

				res.should.have.status(404)
				res.body.should.deep.equal({ error: "Page not found" })
				done()
			})
	})

	it('Get non-existent person', done => {
		chai
			.request(SERVER_URL)
			.get('/person/779b51aa-c51a-45ce-864b-427fd82b3bf2')
			.end((err, res) => {
				if (err) {
					console.log(err)
				}

				res.should.have.status(404)
				res.body.should.deep.equal({ error: "Person not found" })
				done()
			})
	});
})