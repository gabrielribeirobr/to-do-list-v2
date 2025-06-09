const form = document.querySelector('.form-inputs');
const taskInput = document.querySelector('.taskInput');
const taskList = document.querySelector('.taskList'); // UL
const btnAdd = document.querySelector('.btnAdd');

// let tasks = JSON.parse(localStorage.getItem("listTasks",)) || []; // recebendo valores armazenados no localstorage ou uma array

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentTask = {
        name: taskInput.value.toUpperCase(),
        done: false,
        edit: false,
    }
    addTask(currentTask);
});

function addTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("listTasks", JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem("listTasks")) || [];
}

