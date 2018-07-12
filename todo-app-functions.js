// Get todos from localStorage if they exist
const getSavedTodos = function () {
	const todosJSON = localStorage.getItem('todosJSON')
	return JSON.parse(todosJSON) || []
}

// Save todos to localStorage
const saveTodos = function (todos) {
	const todosJSON = JSON.stringify(todos)
	localStorage.setItem('todosJSON', todosJSON)
}

// Create the DOM element for a remove btn and add some functionality to it
const generateRemoveBtn = function (targetTodo) {
	btn = document.createElement('button')
	btn.classList.add('btn', 'btn-sm', 'btn-remove')
	btn.textContent = 'x'
	btn.targetTodo = targetTodo

	// Recolor the button on hover
	btn.addEventListener('mouseenter', function (e) {
		e.target.classList.add('btn-danger')
	})
	btn.addEventListener('mouseleave', function (e) {
		e.target.classList.remove('btn-danger')
	})
	
	// Remove todo
	btn.addEventListener('click', function (e) {
		todos.splice(todos.indexOf(e.target.targetTodo), 1)
		saveTodos(todos)
		renderTodos(filters, todos)
	})

	return btn
}

// Create the DOM element for a checkbox and add some functionality to it
const generateCheckbox = function (targetTodo) {
	const checkbox = document.createElement('input')
	checkbox.setAttribute('type', 'checkbox')
	checkbox.targetTodo = targetTodo
	checkbox.checked = checkbox.targetTodo.completed

	// Hide/unhide handler
	checkbox.addEventListener('change', function (e) {
		e.target.targetTodo.completed = e.target.checked
		saveTodos(todos)
		renderTodos(filters, todos)
	})

	return checkbox
}


// Create the DOM element for a todo
const generateTodoDOM = function (todo) {
	// <div class="todoRoot card">
	// 	<div class="todoBody row card-body">

	// 		<div class="col-xs-1 checkboxCol">
	// 			<input type="checkbox">
	// 		</div>

	// 		<div class="col-xs-10 textCol">
	// 			<span>todo text</span>
	// 		</div>

	// 		<div class="col-xs-1 btnCol">
	// 			<button>X</button>
	// 		</div>

	// 	</div>
	// </div>

	// Create elements
	const checkboxEl = generateCheckbox(todo)
	const buttonEl = generateRemoveBtn(todo)
	const textEl = document.createElement('span')
	textEl.textContent = todo.text
	
	// Create DOM structure of todo item

	const todoRoot = document.createElement('div')
	todoRoot.classList.add('card')

	const todoBody = document.createElement('div')
	todoBody.classList.add('card-body', 'row')
	todoRoot.appendChild(todoBody)

	const checkboxCol = document.createElement('div')
	checkboxCol.classList.add('col-sm-1')
	checkboxCol.appendChild(checkboxEl)
	todoBody.appendChild(checkboxCol)

	const textCol = document.createElement('div')
	textCol.classList.add('col-sm-9')
	textCol.appendChild(textEl)
	todoBody.appendChild(textCol)

	const btnCol = document.createElement('div')
	btnCol.classList.add('col-sm-1')
	btnCol.appendChild(buttonEl)
	todoBody.appendChild(btnCol)


	return todoRoot
}

// Count uncompleted todos and generate DOM element for a summary
const generateSummaryDOM = function (todos) {
	let todosLeft = 0
	todos.forEach(function (task) {
		if (!task.completed) todosLeft++
	})

	const summary = document.createElement('h2')
	summary.textContent = `You have ${todosLeft} todos left.`
	return summary
}

// Render todos based on filters
const renderTodos = function (filters, todos) {
	document.querySelector('#list-of-tasks').innerHTML = ''
	document.querySelector('#list-of-tasks').appendChild(generateSummaryDOM(todos))

	const filteredTasks = todos.filter(function (task) {
		const searchTextMatch = task.text.toLowerCase().includes(filters.searchText.toLowerCase())
		const isHidden = filters.hideCompleted && task.completed
		return searchTextMatch && !isHidden
	})
	filteredTasks.forEach(function (todo) {
		document.querySelector('#list-of-tasks').appendChild(generateTodoDOM(todo))
	})
}