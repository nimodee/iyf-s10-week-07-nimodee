 function renderTodos(todos) {
    const list = document.getElementById("todoList");

    list.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo;
        list.appendChild(li);
    });
}

window.renderTodos = renderTodos;