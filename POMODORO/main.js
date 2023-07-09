const tasks = [];
console.log(tasks);

let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector('#bAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');
const taskName = document.querySelector('#time #taskName');
const taskContainer = document.querySelector('#tasks');

renderTime();
renderTasks();

// Agrega un event listener al formulario para capturar el evento de envío
form.addEventListener('submit', e => {
    e.preventDefault();

    if (itTask.value !== '') {
        createTask(itTask.value);
        itTask.value = '';
        renderTasks();
    }
});

// Crea una nueva tarea y la agrega al inicio del array "tasks"
const createTask = (value) => {
    const newTask =  {
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false,
    };
    tasks.unshift(newTask);
};

// Genera el HTML para mostrar todas las tareas en la interfaz de usuario
function renderTasks() {
    const html = tasks.map(task => {
        return `
        <div class="task">
             <div class="completed">${task.completed ? `<span class="done">Done</span>`: `<button class="start-button" data-id="${task.id}">Start</button>`}</div>
             <div class="title">${task.title}</div>
        </div>
        `;
    });

    taskContainer.innerHTML = html.join("");

    const startButtons = document.querySelectorAll('.task .start-button');
    startButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!timer) {
                const id = button.getAttribute("data-id");
                startButtonHandler(id);
                button.textContent = "In progress ...";
            }
        });
    });
}

// Maneja el evento de clic en el botón de inicio de una tarea
const startButtonHandler = (id) => {
    time = 5;
    current = id;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    taskName.textContent = tasks[taskIndex].title;
    renderTime();
    timer = setInterval(() => {
        timeHandler(id);
    }, 1000);
};

// Maneja el tiempo restante para una tarea
function timeHandler(id) {
    time--;
    renderTime();
    if (time === 0) {
        clearInterval(timer);
        markCompleted(id);
        timer = null;
        renderTasks();
        startBreak();
    }
}

// Inicia el temporizador de descanso
function startBreak() {
    time = 3;
    taskName.textContent = "Break";
    renderTime();
    timerBreak = setInterval(() => {
        timerBreakHandler();
    }, 1000);
}

// Maneja el tiempo restante para el descanso
function timerBreakHandler() {
    time--;
    renderTime();
    if (time === 0) {
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        taskName.textContent = "";
        renderTasks();
    }
}

// Muestra el tiempo actual en la interfaz de usuario
function renderTime() {
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
}

// Marca una tarea como completada
function markCompleted(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].completed = true;
}
