
// ================= STATE =================
const state = {
    products: [
        { id: 1, name: "Laptop", price: 999 },
        { id: 2, name: "Phone", price: 699 },
        { id: 3, name: "Headphones", price: 199 }
    ],
    cart: []
};

// ================= RENDER PRODUCTS =================
function renderProducts() {
    const container = document.getElementById("productList");

    container.innerHTML = "";

    state.products.forEach(product => {
        const div = document.createElement("div");

        div.innerHTML = `
            <p>${product.name} - ${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        container.appendChild(div);
    });
}

// ================= ADD TO CART =================
function addToCart(productId) {
    const existing = state.cart.find(item => item.productId === productId);

    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }

    renderCart();
}

// ================= REMOVE =================
function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.productId !== productId);
    renderCart();
}

// ================= TOTAL =================
function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(p => p.id === item.productId);
        return total + product.price * item.quantity;
    }, 0);
}

// ================= COUNT =================
function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

// ================= RENDER CART =================
function renderCart() {
    const list = document.getElementById("cartList");
    const totalEl = document.getElementById("total");
    const countEl = document.getElementById("cartCount");

    list.innerHTML = "";

    state.cart.forEach(item => {
        const product = state.products.find(p => p.id === item.productId);

        const li = document.createElement("li");

        li.textContent = '${product.name} x ${item.quantity}';

        const btn = document.createElement("button");
        btn.textContent = "Remove";
        btn.onclick = () => removeFromCart(item.productId);

        li.appendChild(btn);
        list.appendChild(li);
    });

    totalEl.textContent = "Total: " + getCartTotal();
    countEl.textContent = getCartCount();
}

// ================= CLEAR =================
function clearCart() {
    state.cart = [];
    renderCart();
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    renderCart();
});



const NOTES_KEY ="notes";
function saveNotes(notes) {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
}



function renderNotes() {
    const list = document.getElementById("notesList");
    const notes = getNotes();

    list.innerHTML = "";

    notes.forEach((note, index) => {
        const li = document.createElement("li");

        li.textContent = note;

        // click to delete
        li.addEventListener("click", () => {
            deleteNote(index);
        });

        list.appendChild(li);
    });
}  


 function deleteNote(index) {
    const notes = getNotes();

    notes.splice(index, 1);

    saveNotes(notes);

    renderNotes();
}

document.getElementById("addNoteBtn").addEventListener("click", function () {
    const input = document.getElementById("noteInput");

    const text = input.value;

    if (text.trim() === "") {
        return;
    }


    const notes = getNotes();
    notes.push(text);

    saveNotes(notes);

    input.value = "";

    renderNotes();

});

document.addEventListener("DOMContentLoaded", function () {
 renderNotes();
});

// Store a simple value
localStorage.setItem("username", "John");

// Retrieve the value
const username = localStorage.getItem("username");
console.log(username);  // "John"

// Remove a value
localStorage.removeItem("username");


// Check if key exists
if (localStorage.getItem("username")) {
    console.log("User exists");
}



// localStorage only stores strings!
const user = {
    name: "John",
    age: 30,
    hobbies: ["coding", "reading"]
};

// WRONG - doesn't work as expected
localStorage.setItem("user", user);
console.log(localStorage.getItem("user"));  // "[object Object]"

// RIGHT - serialize to JSON
localStorage.setItem("user", JSON.stringify(user));
const retrieved = JSON.parse(localStorage.getItem("user"));
console.log(retrieved);  // { name: "John", age: 30, hobbies: [...] }


// Create reusable helpers
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

// Usage
saveToStorage("settings", { theme: "dark", fontSize: 16 });
const settings = getFromStorage("settings", { theme: "light", fontSize: 14 });

console.log(settings);



const form = document.getElementById("contact-form");
const inputs = form.querySelectorAll("input, textarea");

inputs.forEach(input => {
    const saved = sessionStorage.getItem('form_${input.name}');
    if (saved) {
        input.value = saved;
    }
});

inputs.forEach(input => {
    input.addEventListener("input", function () {
        sessionStorage.setItem('form_${input.name}', input.value);
    });
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    inputs.forEach(input => {
        sessionStorage.removeItem('form_${input.name}');
        input.value = "";
    });

    //alert("Form submitted!");
});



// EXERCISE 2: OBSERVER PATTERN
// ===============================

function createStore(initialState) {
    let state = initialState;
    const listeners = [];

    return {
        getState: () => state,

        setState: (updates) => {
            state = { ...state, ...updates };

            listeners.forEach(listener => listener(state));
        },

        subscribe: (listener) => {
            listeners.push(listener);

            return () => {
                const index = listeners.indexOf(listener);
                listeners.splice(index, 1);
            };
        }
    };
}

// STORE
const store = createStore({
    todos: []
});

// RENDER FUNCTION (observer)
store.subscribe((state) => {
    const list = document.getElementById("todoList");

    list.innerHTML = "";

    state.todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo.text;
        list.appendChild(li);
    });
});

// ADD TODO
function addTodo(text) {
    const current = store.getState();

    store.setState({
        todos: [
            ...current.todos,
            { id: Date.now(), text }
        ]
    });
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
    store.setState({ todos: [] });
});


