const db = require('../db')
const { randomUUID } = require('crypto')

exports.getAll = (req, res) => {
	res.statusCode = 200
	res.end(JSON.stringify(db.getAll()))
}

exports.getById = (req, res) => {
	const userID = req.url.match(/^\/person\/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/) == null 
		? 0 
		: req.url.match(/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/)
	
	if(userID == 0) {
		res.statusCode = 400
		res.end(JSON.stringify({ error: "Invalid id" }))
	} else {
		if (db.getById(userID).length == 0) {
			res.statusCode = 404
			res.end(JSON.stringify({ error: "Person not found" }))
		} else {
			res.statusCode = 200
			res.end(JSON.stringify(db.getById(userID)[0]))
		}
	}
}

exports.create = (req, res) => {
	let person
	req.on('data', (data) => {
		person = JSON.parse(data.toString())
	})
	req.on('end', () => {
		if (!person.name || !person.age || !person.hobbies) {
			res.statusCode = 400
			res.end(JSON.stringify({ error: "Not enought data" }))
		} else {
			person._id = randomUUID()

			res.statusCode = 201
			res.end(JSON.stringify(db.addPerson(person)))
		}
	}) 
}

exports.put = (req, res) => {
	const userID = req.url.match(/^\/person\/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/) == null 
		? 0 
		: req.url.match(/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/)

	if(userID === 0) {
		res.statusCode = 400
		res.end(JSON.stringify({ error: "Invalid id" }))
	} else {
		let person
		req.on('data', data => {
			person = JSON.parse(data.toString())
		})

		req.on('end', () => {
			if (!person.name || !person.age || !person.hobbies) {
				res.statusCode = 400
				res.end(JSON.stringify({ error: "Not enought data" }))
			} else {
				person._id = userID

				let putPerson = db.putPerson(person)
				if (putPerson.error) {
					res.statusCode = 404
					res.end(JSON.stringify(putPerson))
				} else {
					res.statusCode = 200
					res.end(JSON.stringify(putPerson))
				}
			}
		})
	}
}

exports.deleteById = (req, res) => {
	const userID = req.url.match(/^\/person\/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/) == null 
		? 0 
		: req.url.match(/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/)
	
	if (userID === 0) {
		res.statusCode = 400
		res.end(JSON.stringify({ error: "Invalid id" }))
	} else {
		if (db.deletePerson(userID)) {
			res.statusCode = 204
			res.end()
		} else {
			res.statusCode = 404
			res.end(JSON.stringify({ error: "Person not found" }))
		}
	}
}

exports.deleteAll = (req, res) => {
	db.clearAll()
	res.statusCode = 200
	res.end()
}