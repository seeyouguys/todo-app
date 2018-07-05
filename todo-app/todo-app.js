const todos = [{
	text: 'It started like a plague',
	completed: true
}, {
	text: 'A multicolored nightmare',
	completed: true
}, {
	text: '1,000,080 posts',
	completed: false
}, {
	text: 'But still there\'s no solution',
	completed: true
}]

const filters = {
	searchText: ''
}

const renderTodos = function (filters, list) {
	document.querySelector('#list-of-tasks').innerHTML = ''

	let todosLeft = 0
	list.forEach(function (task) {
		if (!task.completed) todosLeft++
	})

	const summary = document.createElement('h2')
	document.querySelector('#list-of-tasks').appendChild(summary)
	summary.textContent = `You have ${todosLeft} todos left.`

	const filteredTasks = list.filter(function (task) {
		return task.text.toLowerCase().includes(filters.searchText.toLowerCase()) 
	})	
	
	filteredTasks.forEach(function (task) {
		taskElement = document.createElement('p')
		taskElement.textContent = task.text
		document.querySelector('#list-of-tasks').appendChild(taskElement)
	})
}

renderTodos(filters, todos)

// Listen for the "filter" input field changes
document.querySelector('#filter-input').addEventListener('input', function (e) {
	filters.searchText = e.target.value
	renderTodos(filters, todos)
})

document.querySelector('#add-task').addEventListener('submit', function (e) {
	e.preventDefault()
	let text = e.target.elements.todo.value
	todos.push({
		text: text,
		completed: false
	})
	e.target.elements.todo.value = null
	renderTodos(filters, todos)
})
