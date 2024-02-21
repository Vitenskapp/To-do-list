let inputTask = document.querySelector('#inputTask')
let button = document.querySelector('#createButton')
let taskList = document.querySelector('#taskList')

let listaDeTarefas = []

function criarTask() {
    listaDeTarefas.push({
        task: inputTask.value,
        isChecked: false
    })
    mostrarTasks()
    mostrarAlerta()
    setTimeout(() => {
        esconderAlerta()
    }, 1000)
}

function carregarStorage() {
    if (localStorage.getItem('Lista')) {
        let recString = localStorage.getItem('Lista')
        listaDeTarefas = JSON.parse(recString)
    let novoItem = ''
    listaDeTarefas.forEach((el, pos) => {
        novoItem += `<div id="taskBox" class="taskBox">
        <input class="iconify check ${el.isChecked && "done"}" data-icon="mdi-check" onClick="concluirTask(${pos})" id="check">

        <p id="task" class="task">${el.task}</p>

        <button onClick="deletarTask(${pos})" type="button" class="iconify trash" data-icon="mdi-trash"></button>
    </div>`
        taskList.innerHTML = novoItem
    })
    }
}

function mostrarAlerta() {
    let alerta = document.querySelector('.alerta')
    alerta.style.transition = "0.2s ease-in-out"
    alerta.style.opacity = "1"
}
function esconderAlerta() {
    let alerta = document.querySelector('.alerta')
    alerta.style.transition = "1s ease-in-out"
    alerta.style.opacity = "0"
}

function mostrarTasks() {
    let novoItem = ''
    listaDeTarefas.forEach((el, pos) => {
        novoItem += `<div id="taskBox" class="taskBox">
        <input class="iconify check ${el.isChecked && "done"}" data-icon="mdi-check" onClick="concluirTask(${pos})" id="check">

        <p id="task" class="task">${el.task}</p>

        <button onClick="deletarTask(${pos})" type="button" class="iconify trash" data-icon="mdi-trash"></button>
    </div>`
    })
    taskList.innerHTML = novoItem
    let armazenadas = JSON.stringify(listaDeTarefas)
    localStorage.setItem("Lista", armazenadas)
}

function concluirTask(pos){
    listaDeTarefas[pos].isChecked = !listaDeTarefas[pos].isChecked
    mostrarTasks()
    carregarStorage()
}

function deletarTask(pos) {
    listaDeTarefas.splice(pos, 1)
    mostrarTasks()
    carregarStorage()
}

button.addEventListener('click', criarTask)
document.body.addEventListener('load', carregarStorage)