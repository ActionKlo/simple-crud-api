/**
 * Работает если сервер не запущен
 * Можно подправить и запускать сервер не другом порту, но по заданию не надо
 * А то что ниже сделал для себя
 */

/*
const server = require('../src/server')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
chai.use(chaiHttp)

describe('Server', () => {
	before(() => {
		server.start()
	})
	
	after(() => {
		server.close()
	})

	it('get', (done) => {
		chai
			.request('http://localhost:3000')
			.get('/person')
			.end((err, res) => {
				if (err) {
					console.error(err)
				}

				if (res) {
					console.log(res.body)
				}
				done()
			})
	})
})
*/