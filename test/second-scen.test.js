const dotenv = require('dotenv')
const config = dotenv.config().parsed

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
chai.use(chaiHttp)

let TEST_USER = {
	name: "Test",
	age: 23,
	hobbies: ["Test"]
}

let PUT_DATA = {
	name: "Test put",
	age: 24,
	hobbies: ["PUT"]
}

let ERROR_DATA = {
	name: "Error",
	age: 99
}

const SERVER_URL = `${config.DEV_URL}:${config.DEV_PORT}`

describe('Second scenario', () => {
	let _id = ''

	it('Create new person', done => {
		chai
			.request(SERVER_URL)
			.post('/person')
			.send(TEST_USER)
			.end((err, res) => {
				if (err) {
					console.log(err)
				}

				res.should.have.status(201)
				res.body.should.have.property('_id')

				_id = res.body._id
				TEST_USER._id = _id

				res.body.should.deep.equal(TEST_USER)
				done()
			})
	})
	
	it('Get person by id', done => {
		chai
			.request(SERVER_URL)
			.get(`/person/${_id}`)
			.end((err, res) => {
				if (err) {
					console.log(err)
				}

				res.should.have.status(200)
				res.body.should.deep.equal(TEST_USER)
				done()
			})
	})

	it('Put error data to new person', done => {
		chai
			.request(SERVER_URL)
			.put(`/person/${_id}`)
			.send(ERROR_DATA)
			.end((err, res) => {
				if (err) {
					console.log(err)
				}

				res.should.have.status(400)
				res.body.should.deep.equal({ error: "Not enought data"})
				done()
			})
	})
	
	it('Check data of person', done => {
		chai
			.request(SERVER_URL)
			.get(`/person/${_id}`)
			.end((err, res) => {
				if (err) {
					console.log(err)
				}

				res.body.should.deep.equal(TEST_USER)
				done()
			})
	})

	it('Delete person', done => {
		chai
			.request(SERVER_URL)
			.delete(`/person/${_id}`)
			.end((err, res) => {
				if (err) {
					console.log(err)
				}

				res.should.have.status(204)
				done()
			})
	})

	it('Get deleted person by id', done => {
		chai
			.request(SERVER_URL)
			.get(`/person/${_id}`)
			.end((err, res) => {
				if (err) {
					console.log(err)
				}

				res.should.have.status(404)
				res.body.should.deep.equal({ error: "Person not found" })
				done()
			})
	})
})