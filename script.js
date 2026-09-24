let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    input.value = "";

    displayTasks(tasks);
}

function displayTasks(taskArray) {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    taskArray.forEach(task => {
        const li = document.createElement("li");
        li.className = "task";

        li.innerHTML = `
            <input type="checkbox"
                   ${task.completed ? "checked" : ""}
                   onchange="toggleTask(${task.id})">

            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <button class="delete-btn"
                    onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });

    updateTaskCount();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    displayTasks(tasks);
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks(tasks);
}

function showTasks(type) {
    let filteredTasks;

    if (type === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (type === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else {
        filteredTasks = tasks;
    }

    displayTasks(filteredTasks);
}

function updateTaskCount() {
    const activeTasks = tasks.filter(task => !task.completed).length;

    document.getElementById("taskCount").textContent =
        `${activeTasks} active task${activeTasks !== 1 ? "s" : ""}`;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

displayTasks(tasks);
