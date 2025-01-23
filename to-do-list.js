const taskInput = document.getElementById('taskInput');
const taskButton = document.getElementById('button');
const taskList = document.getElementById('toDoList');

function addTask() {
    const taskValue = taskInput.value.trim();

    if (taskValue !== '') {
        const taskElement = document.createElement('li');
        taskElement.setAttribute('draggable', true);
        taskElement.addEventListener('dragstart', handleDragStart);
        taskElement.addEventListener('dragover', handleDragOver);
        taskElement.addEventListener('drop', handleDrop);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-btn');

        deleteButton.addEventListener('click', () => {
            taskElement.remove();
            saveTasksToCookie(); // Save after deleting a task
        });

        taskElement.appendChild(deleteButton);
        const taskText = document.createTextNode(taskValue);
        taskElement.appendChild(taskText);

        taskList.appendChild(taskElement);
        saveTasksToCookie(); // Save after adding a task

        taskInput.value = '';
    } else {
        alert('Yo dawg. Put something in the box.')
    }
}

let draggedTask = null; // To store the task being dragged

function handleDragStart(event) {
    draggedTask = event.target; // Save the dragged element
}

function handleDragOver(event) {
    event.preventDefault(); // Necessary to allow drop
}

function handleDrop(event) {
    event.preventDefault();
    event.target.style.opacity = '1'; // Reset opacity

    // Ensure we're dropping onto another task
    if (event.target.tagName === 'LI' && draggedTask !== event.target) {
        // Swap the tasks
        const taskList = event.target.parentNode;
        taskList.insertBefore(draggedTask, event.target.nextSibling);
    }
}

document.addEventListener('DOMContentLoaded', loadTasksFromCookie); // Load tasks when the page loads
taskButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

function saveTasksToCookie() {
    const tasks = [];
    document.querySelectorAll('#toDoList li').forEach((li) => {
        const taskText = li.childNodes[1]?.textContent.trim(); // Get task text (after button)
        if (taskText) tasks.push(taskText);
    });

    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))}; path=/; max-age=31536000`; // Save for 1 year
}

function loadTasksFromCookie() {
    const cookies = document.cookie.split(';');
    const taskCookie = cookies.find(cookie => cookie.trim().startsWith('tasks='));
    if (taskCookie) {
        const tasks = JSON.parse(decodeURIComponent(taskCookie.split('=')[1]));
        tasks.forEach(task => {
            const taskElement = document.createElement('li');

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.classList.add('delete-btn');

            deleteButton.addEventListener('click', () => {
                taskElement.remove();
                saveTasksToCookie();
            });

            taskElement.appendChild(deleteButton);
            const taskText = document.createTextNode(task);
            taskElement.appendChild(taskText);

            taskList.appendChild(taskElement);
        });
    }
}