// Получаем элементы DOM
const addButton = document.querySelector('.in');
const inputField = document.querySelector('.in_t');
const taskList = document.querySelector('.tasklist');

// Получаем массив задач из localStorage или создаем пустой массив
let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Функция добавления задачи
const addTask = (taskText) => {
  // Проверяем, есть ли задача с таким текстом в списке
  const taskListItems = taskList.querySelectorAll('li');
  for (let i = 0; i < taskListItems.length; i++) {
    if (taskListItems[i].querySelector('span').innerText === taskText) {
      return;
    }
  }

  // Создаем новую задачу
  const newTask = document.createElement('li');
  const taskSpan = document.createElement('span');
  taskSpan.innerText = taskText;

  const buttonStorage = document.createElement('div');
  // Создаем кнопку(галочка)
  const taskButton = document.createElement('button');
  taskButton.classList.add("button1");
  taskButton.addEventListener('click', () => {
    if(window.innerWidth <= 600){
      taskSpan.style.fontSize = '10px';
    }else{taskSpan.style.fontSize = '20px';}
    taskSpan.style.textDecoration = 'line-through';
    taskSpan.style.color = "gray";
    savedTasks = savedTasks.map((task) => {
      return task === taskText ? `completed:${task}` : task;
    });
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  });

  // Сохраняем класс кнопки в localStorage
  localStorage.setItem(`button_${taskText}`, "button1");
  // Создаем кнопку(корзина)
  const deleteButton = document.createElement('button');
  deleteButton.classList.add("button2");
  deleteButton.addEventListener('click', function() {
    removeTask(newTask, taskText);
  });

  buttonStorage.appendChild(taskButton);
  buttonStorage.appendChild(deleteButton);
  newTask.appendChild(taskSpan);
  newTask.appendChild(buttonStorage);
  taskList.appendChild(newTask);

  inputField.value = '';

  savedTasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
};

// При загрузке страницы добавляем сохраненные задачи в список задач
savedTasks.forEach(task => {
  if (task.startsWith('completed:')) {
    addTask(task.substr(10));
    const taskSpan = taskList.lastElementChild.querySelector('span');
    taskSpan.style.textDecoration = 'line-through';
    taskSpan.style.fontSize = '20px';
  } else {
    addTask(task);
    // Если есть сохраненный класс для кнопки, устанавливаем его
    const buttonClass = localStorage.getItem(`button_${task}`);
    if (buttonClass) {
      const taskButton = taskList.lastElementChild.querySelector('.button1');
      taskButton.classList.add(buttonClass);
    }
  }
});

// Добавляем функцию добавления задачи по клику на кнопку
addButton.addEventListener('click', () => {
  const taskText = inputField.value.trim();
  if (taskText !== '') {
    addTask(taskText);
  }
});
// Добавляем функцию добавления задачи по нажатию на enter
inputField.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    const taskText = inputField.value.trim();
    if (taskText !== '') {
      addTask(taskText);
    }
  }
});

// Функция удаления задачи
function removeTask(task, taskText) {
  task.remove();
  savedTasks = savedTasks.filter(t => t !== taskText && t !== `completed:${taskText}`);
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
}