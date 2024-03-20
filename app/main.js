const taskInput = document.querySelector('#input');
const addBtn = document.querySelector('#add-btn');
const taskList = document.querySelector('#task-list');
const circleProgress = document.querySelector('circle-progress');
const alert = document.querySelector('.alert');
const completedMessage = document.querySelector('.completed-message');



let taskArray = [];

const cleanInput = () => {
    taskInput.value = "";
  }

const createTask = (task) => {
  if (task.trim() === '') {
    alert.setAttribute('style', 'display: block;');
    return taskInput.classList.add('error');
  } else {
    alert.setAttribute('style', 'display: none;');
 taskInput.classList.remove('error');
  }

  taskArray.push({
    id: Date.now(),
    task: task,
    completed: false
  });

  let newLi = "";
  taskArray.map((el) => {
    newLi += `
      <li>
        <i class="material-icons check ${el.completed?"completed":"not-completed"}" onClick="checkTask(${el.id})">check</i>
        <p>${el.task}</p>
        <i class="material-icons delete" onClick="removeTask(${el.id})">delete</i>
      </li>`

    taskList.innerHTML = newLi;
  })
  saveStorage();
  updateProgressCircle();
}

const removeTask = (id) => {
  taskArray = taskArray.filter((el)  => el.id !== id);
  saveStorage();
  updateProgressCircle();
  refreashList();
}

const checkTask = (id) => {
  taskArray = taskArray.map((el) => {
    if (el.id === id) {
      el.completed = !el.completed;
    return el;
    }
    return el;
  })
  refreashList();
  saveStorage();
  updateProgressCircle();
}

const updateProgressCircle = () => {
  const totalTasks = taskArray.length;
const completedTasks = taskArray.filter(task => task.completed).length;
  circleProgress.value = completedTasks;
  circleProgress.max = totalTasks;
  if (completedTasks === totalTasks){
    completedMessage.setAttribute('style', 'display: block;');
  } 
  else {
    completedMessage.setAttribute('style', 'display: none;');
  }
  if(totalTasks === 0){
    completedMessage.setAttribute('style', 'display: none;');
  }
}

const refreashList = () => {
  let newLi = "";
  taskArray.map((el) => {
    newLi += `
      <li>
        <i class="material-icons check ${el.completed?"completed":"not-completed"}" onClick="checkTask(${el.id})">check</i>
        <p>${el.task}</p>
        <i class="material-icons delete" onClick="removeTask(${el.id})">delete</i>
      </li>`

  })
  taskList.innerHTML = newLi;
}

const saveStorage = () => {
  localStorage.setItem('taskArray', JSON.stringify(taskArray));
}

addBtn.addEventListener('click', () =>
{ createTask(taskInput.value);
  cleanInput();
})
window.addEventListener('load', () => {
  const savedTasks = JSON.parse(localStorage.getItem('taskArray'));
  if (savedTasks) {
    taskArray = savedTasks;
    refreashList();
  }
  updateProgressCircle();
})
