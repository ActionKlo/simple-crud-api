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