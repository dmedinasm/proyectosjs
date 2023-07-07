
const tasks = [];
console.log(tasks)
let time = 0;
let timer = null;// Ejecutar un pedazo de codigo cada determinado tiempo
let timerBreak = null;//5 minutos de descanso
let current = null;// Tarea actual que se esta ejecutando


const bAdd = document.querySelector('#bAdd')
const itTask = document.querySelector('#itTask')
const form = document.querySelector('#form')


form.addEventListener('submit', e =>{
    e.preventDefault();

    if(itTask.value !== ''){
    createTask(itTask.value)
    itTask.value = '';//Para eliminar el texto de mi input
    renderTasks();
    }
    
})

const createTask = (value) => {
    const newTask =  {
        id:(Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false,
    };
    tasks.unshift(newTask);
}

function renderTasks(){
    const html = tasks.map(task => {
        return `
        <div class="task">
             <div class="completed">${task.completed ? `<span class="done">Done</span>`: `<button class="start-button" data-id="${task.id}">Start</button>`}</div>
             <div class="title">${task.title}</div>
        </div>
        `;
    });

    console.log(html);
    const taskContainer = document.querySelector('#tasks')
    taskContainer.innerHTML = html.join("")//El metodo map va a devolver un arreglo de strings, con el metodo join los unimos todo a un solo string
}