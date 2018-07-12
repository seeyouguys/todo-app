const filters = {
	searchText: '',
	hideCompleted: false
}

const todos = getSavedTodos()
renderTodos(filters, todos)

// Listen for the "filter" input field changes
document.querySelector('#filter-input').addEventListener('input', function (e) {
	filters.searchText = e.target.value
	renderTodos(filters, todos)
})

// Add a task function
document.querySelector('#add-task').addEventListener('submit', function (e) {
	e.preventDefault()
	const text = e.target.elements.todo.value
	
	if (text !== '') {
		todos.push({
			text: text,
			completed: false
		})
		e.target.elements.todo.value = null
		
		saveTodos(todos)
		renderTodos(filters, todos)
	} else {
		todos.push({
			text: 'Unnamed test Todo',
			completed: false
		})
		e.target.elements.todo.value = null

		saveTodos(todos)
		renderTodos(filters, todos)
	}
})

// "Hide completed" checkbox handler
document.querySelector('#hide').addEventListener('change', function (e) {
	filters.hideCompleted = e.target.checked
	renderTodos(filters, todos)
})