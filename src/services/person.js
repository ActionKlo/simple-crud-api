const db = require('../db')
const { randomUUID } = require('crypto')

exports.getAll = (req, res) => {
	res.end(JSON.stringify(db.getAll()))
}

exports.getById = (req, res) => {
	const userID = req.url.match(/([0-9a-f]+\-?)+/g)[1] 

	if(userID.length !== 36) {
		res.statusCode = 400
		res.end(JSON.stringify({ Error: "Invalid id" }))
	} else {
		const persons = db.getAll()
		
		let found = false
		for (let i = 0; i < persons.length; i++) {
			console.log(persons[i]._id + "\n" + userID)
			if (persons[i]._id == userID) {
				res.statusCode = 200
				res.end(JSON.stringify(persons[i]))
				found = true
			}
		}
		if (!found) {
			res.statusCode = 404
			res.end(JSON.stringify({ Error: "User not found" }))
			res.emit('end')
		}
	}
}

exports.create = (req, res) => {
	let person
	req.on('data', (data) => {
		person = JSON.parse(data.toString())
	})
	req.on('end', () => {
		person._id = randomUUID()
		db.addPerson(person)

		res.statusCode = 201
		res.end(JSON.stringify(person))
	})
}