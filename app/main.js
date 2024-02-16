let inputTask = document.querySelector('#inputTask')
let button = document.querySelector('#createButton')
let taskList = document.querySelector('#taskList')

let listaDeTarefas = []

function criarTask() {
    
    listaDeTarefas.push({
        task: inputTask.value,
        isChecked: false
    })

    let novoItem = ''
    listaDeTarefas.map((el, pos) => {
        novoItem += `<div id="taskBox"       class="taskBox">
        <input class="iconify check" data-icon="mdi-check" onClick="concluirTask(evt, ${pos})" id="check">
        <p id="task" class="task">${el.task}</p>
        <button onClick="deletarTask(${pos})" type="button" class="iconify trash" data-icon="mdi-trash"></button>
    </div>`
        taskList.innerHTML = novoItem;
    })

    console.log(listaDeTarefas)
}

function concluirTask(evt, pos){
    if (listaDeTarefas[pos].isChecked) {
        listaDeTarefas[pos].isChecked = false
        evt.target.style.backgroundColor = "white"
    } else {
        listaDeTarefas[pos].isChecked = true;
        evt.target.style.backgroundColor = "green"
    }
}

function deletarTask(pos) {
    listaDeTarefas.splice(pos, 1)
    console.log(listaDeTarefas)
    recarregarLista()
}

function recarregarLista() {
    let novoItem = ''
    listaDeTarefas.map((el, pos) => {
        novoItem += `<div id="taskBox"       class="taskBox">
        <input class="iconify check" data-icon="mdi-check" onClick="concluirTask(evt, ${pos})" id="check">
        <p id="task" class="task">${el.task}</p>
        <button onClick="deletarTask(${pos})" type="button" class="iconify trash" data-icon="mdi-trash"></button>
    </div>`
        taskList.innerHTML = novoItem;
    })
}

button.addEventListener('click', criarTask)