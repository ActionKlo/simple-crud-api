let arr = []

exports.addPerson = (person) => {
	arr.push(person)
	return person
}

exports.getAll = () => {
	return arr
}

exports.getById = (userID) => {
	return arr.filter(person => person._id == userID)
}

exports.putPerson = (person) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i]._id == person._id) {
			arr[i].name = person.name
			arr[i].age = person.age
			arr[i].hobbies = person.hobbies
			return arr[i]
		}
	}
	return { error: "Person not found" }
}

exports.deletePerson = (userID) => {
	let deleted =  false
	arr = arr.filter(person => {
		if (person._id == userID) {
			deleted = true
		}
		return person._id != userID
	})
	
	return deleted
}

exports.clearAll = () => {
	return arr = []
}