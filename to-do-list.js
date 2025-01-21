const taskInput = document.getElementById('taskInput');
const taskButton = document.getElementById('button');
const taskList = document.getElementById('toDoList');


function addTask() {
    const taskValue = taskInput.value.trim();

    if (taskValue !== '') {
        const taskElement = document.createElement('li');
        taskElement.textContent = taskValue;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-btn');

        deleteButton.addEventListener('click', () => {
            taskElement.remove();
        });

        taskElement.appendChild(deleteButton);

        taskList.appendChild(taskElement);

        taskInput.value = '';
    } else {
        null
    }
}

taskButton.addEventListener('click', addTask)
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
})