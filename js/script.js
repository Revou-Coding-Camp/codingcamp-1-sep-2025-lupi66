/// Variables to store todo items
let todoList = [];

/// Function to validate input fields
function validateInput() {
    const todoInput = document.getElementById('todo-input').value;
    const todoDateInput = document.getElementById('todo-date-input').value;
    const todoStatusInput = document.getElementById('status').value;

    if (todoInput === '' || todoDateInput === '' || todoStatusInput === '') {
        alert('Harap diisi.');
    } else {
        addTodo(todoInput, todoDateInput,todoStatusInput);
    }
}

function addTodo(todo, dueDate, status) {
    // Add a new todo item to the list
    const todoItem = {
        task: todo,
        dueDate: dueDate,
        status: status,
        completed: false
    };

    /// Push the new item to the todo list array
    todoList.push(todoItem);

    /// Re-render the todo list
    renderTodoList();
}

function deleteAllTodo() {
    // Clear the todo list array
    todoList = [];

    /// Re-render the todo list
    renderTodoList();
}

function filterTodo() {
    // Urutkan todoList sesuai permintaan
    const sortedList = [...todoList].sort((a, b) => {
        // Urutkan berdasarkan status: 'Mendesak' dulu
        if (a.status === 'Mendesak' && b.status !== 'Mendesak') return -1;
        if (a.status !== 'Mendesak' && b.status === 'Mendesak') return 1;
        // Jika status sama, urutkan berdasarkan tanggal
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    // Render hasil urutan
    const todoListContainer = document.getElementById('todo-list');
    todoListContainer.innerHTML = '';
    sortedList.forEach((item) => {
        todoListContainer.innerHTML += `
            <input type="checkbox" ${item.completed ? 'checked' : ''} onclick="item.completed = !item.completed; renderTodoList();">
           ${item.task} ${item.dueDate} ${item.status} <br>
        `;
    });
}

function renderTodoList() {
    // Code to render the todo list on the webpage
    const todoListContainer = document.getElementById('todo-list');
    todoListContainer.innerHTML = ''; // Clear existing list

    /// Loop through the todoList array and create HTML elements for each item
    todoList.forEach((item) => {
        todoListContainer.innerHTML += `
            <input type="checkbox" ${item.completed ? 'checked' : ''} onclick="item.completed = !item.completed; renderTodoList();">
            ${item.task} - ${item.dueDate} --- ${item.status}
            <br>
        `;
    });
}
