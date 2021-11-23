let arr = []

exports.addPerson = (person) => {
	arr.push(person)
}

exports.getAll = () => {
	return arr
}