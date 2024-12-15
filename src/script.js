document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value;

    if (taskValue) {
        addTask(taskValue);
        taskInput.value = '';
    }
});

function addTask(task) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="task-name">${task}</span>`;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const completeBtn = createButton('fas fa-check-circle', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    const deleteBtn = createButton('fas fa-trash', () => {
        li.remove();
        saveTasks();
    });

    buttonContainer.append(completeBtn, deleteBtn);
    li.append(buttonContainer);
    document.getElementById('taskList').appendChild(li);
    saveTasks();
}

function createButton(iconClass, onClick) {
    const button = document.createElement('button');
    button.innerHTML = `<i class="${iconClass}"></i>`;
    button.addEventListener('click', onClick);
    return button;
}

function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('#taskList li')).map(li => ({
        text: li.querySelector('.task-name').textContent,
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(({ text, completed }) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="task-name">${text}</span>`;
        if (completed) li.classList.add('completed');

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const completeBtn = createButton('fas fa-check-circle', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        const deleteBtn = createButton('fas fa-trash', () => {
            li.remove();
            saveTasks();
        });

        buttonContainer.append(completeBtn, deleteBtn);
        li.append(buttonContainer);
        document.getElementById('taskList').appendChild(li);
    });
}