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
		
		// ! сделать рефакторинг и запихнуть в db.js ???
		// ? 
		let found = false
		for (let i = 0; i < persons.length; i++) {
			if (persons[i]._id == userID) {
				res.statusCode = 200
				res.end(JSON.stringify(persons[i]))
				found = true
			}
		}
		if (!found) {
			res.statusCode = 404
			res.end(JSON.stringify({ Error: "Person not found" }))
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

		res.statusCode = 201
		res.end(JSON.stringify(db.addPerson(person)))
	})
}

exports.put = (req, res) => {
	const userID = req.url.match(/([0-9a-f]+\-?)+/g)[1]

	if(userID.length !== 36) {
		res.statusCode = 400
		res.end(JSON.stringify({ Error: "Invalid id" }))
	} else {
		let person
		req.on('data', data => {
			person = JSON.parse(data.toString())
		})

		req.on('end', () => {
			person._id = userID

			let putPerson = db.putPerson(person)
			if (putPerson.Error) {
				res.statusCode = 404
				res.end(JSON.stringify(putPerson))
			} else {
				res.statusCode = 200
				res.end(JSON.stringify(putPerson))
			}
		})
	}
}

exports.deleteById = (req, res) => {
	const userID = req.url.match(/([0-9a-f]+\-?)+/g)[1]
	if (userID.length != 36) {
		res.statusCode = 400
		res.end(JSON.stringify({ Error: "Invalid id" }))
	}
	console.log(userID)
	if (db.deletePerson(userID)) {
		res.statusCode = 204
		res.end()
	} else {
		res.statusCode = 404
		res.end(JSON.stringify({ Message: "Person not found" }))
	}
}