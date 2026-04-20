
document.addEventListener("DOMContentLoaded", () => {
    const saved = load("state");

    const state = saved || {
        todos: [],
        filter: "all",
        theme: "light"
    };

    console.log("App started successfully")
    console.table(state.todos);
    renderTodos(state.todos);
});