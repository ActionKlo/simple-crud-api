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

const SERVER_URL = `${config.DEV_URL}:${config.DEV_PORT}`

describe('Scenario from task', () => {
	let _id = ''
	it('Get all person', done => {
		chai
			.request(SERVER_URL)
			.get('/person')
			.end((err, res) => {
				if (err) {
					console.log(err)
				}

				res.should.have.status(200)
				res.body.should.deep.equal([])
				done()
			})
	})

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

	it('Put new data to exist person', done => {
		chai
			.request(SERVER_URL)
			.put(`/person/${_id}`)
			.send(PUT_DATA)
			.end((err, res) => {
				if (err) {
					console.log(err)
				}

				PUT_DATA._id = _id

				res.should.have.status(200)
				res.body.should.deep.equal(PUT_DATA)

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