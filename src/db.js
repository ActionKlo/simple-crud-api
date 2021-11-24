let arr = []

exports.addPerson = (person) => {
	arr.push(person)
	return person
}

exports.getAll = () => {
	return arr
}

exports.putPerson = (person) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i]._id == person._id) {
			return arr[i] = person
		}
	}
	return { Error: "Person not found" }
}

exports.deletePerson = (userID) => {
	console.log(userID)
	let deleted =  false
	arr = arr.filter(person => {
		if (person._id == userID) {
			deleted = true
		}
		return person._id != userID
	})
	console.log(deleted)
	console.log(arr)
	return deleted
}