const tasks = [];

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    const parsedTasks = JSON.parse(savedTasks);
    tasks.length = 0;
    document.getElementById('task-list').innerHTML = '';
    parsedTasks.forEach(task => {
      tasks.push(task);
      addTaskToDOM(task);
    });
  }
}

function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.style.display = 'flex';
  li.style.justifyContent = 'space-between';
  li.style.alignItems = 'center';
  li.style.padding = '8px 12px';
  li.style.borderBottom = '1px solid #ddd';

  const span = document.createElement('span');
  span.textContent = task.text;
  span.style.cursor = 'pointer';
  if (task.isDone) {
    span.style.textDecoration = 'line-through';
    span.style.color = 'gray';
  }

  span.addEventListener('click', function () {
    task.isDone = !task.isDone;
    span.style.textDecoration = task.isDone ? 'line-through' : 'none';
    span.style.color = task.isDone ? 'gray' : 'black';
    saveTasksToLocalStorage();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.style.backgroundColor = 'red';
  deleteBtn.style.color = 'white';
  deleteBtn.style.border = 'none';
  deleteBtn.style.padding = '5px 10px';
  deleteBtn.style.cursor = 'pointer';
  deleteBtn.style.borderRadius = '4px';

  deleteBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    li.remove();
    const index = tasks.indexOf(task);
    if (index > -1) {
      tasks.splice(index, 1);
      saveTasksToLocalStorage();
    }
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  document.getElementById('task-list').appendChild(li);
}

function addTask() {
  const input = document.getElementById('new-task');
  const taskText = input.value.trim();

  if (taskText === '') {
    alert('Add new task, please!');
    return;
  }

  const task = {
    text: taskText,
    isDone: false,
  };

  tasks.push(task);
  addTaskToDOM(task);
  saveTasksToLocalStorage();
  input.value = '';
}

document.getElementById('add-task').addEventListener('click', addTask);

window.onload = function () {
  loadTasksFromLocalStorage();
};

function filterTasks(filterType) {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear trước

  tasks.forEach(task => {
    if (
      filterType === 'all' ||
      (filterType === 'active' && !task.isDone) ||
      (filterType === 'done' && task.isDone)
    ) {
      addTaskToDOM(task);
    }
  });
}

