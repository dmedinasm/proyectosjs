
const tasks = [];
console.log(tasks)
let time = 0;
let timer = null;// Ejecutar un pedazo de codigo cada determinado tiempo
let timerBreak = null;//5 minutos de descanso
let current = null;// Tarea actual que se esta ejecutando


const bAdd = document.querySelector('#bAdd')
const itTask = document.querySelector('#itTask')
const form = document.querySelector('#form')
const taskName = document.querySelector('#time #taskName')
const taskContainer = document.querySelector('#tasks')


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


    taskContainer.innerHTML = html.join("")//El metodo map va a devolver un arreglo de strings, con el metodo join los unimos todo a un solo string

    const startButtons = document.querySelectorAll('.task .start-button')
    startButtons.forEach(button =>{
        button.addEventListener('click', (e) =>{
            if (!timer){
                const id = button.getAttribute("data-id");
                startButtonHandler(id);
                button.textContent = "In progress ...";
            }
        } )
    })
}

const startButtonHandler = (id =>{
    time = 5;
    current = id;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    taskName.textContent = tasks[taskIndex].title;
    timer = setInterval(() =>{
        timeHandler(id);
    }, 1000);//Ejecuta una funcion de forma indefinida hasta que yo la detenga
})

function timeHandler(id){
    time--;
    renderTime()
    if(time === 0){
        clearInterval(timer)
        current = null;
        taskName.textContent = "";
        taskContainer.innerHTML = "  ";
        renderTime();
    }
}

function renderTime(){
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent =`${minutes < 10 ? "0" : ""}${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`
}

