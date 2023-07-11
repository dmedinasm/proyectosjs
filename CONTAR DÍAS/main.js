let events = []
let arr = [] //Cargar información

const eventName = document.querySelector('#eventName')
const eventDate = document.querySelector('#eventDate')
const buttonAdd = document.querySelector('#bAdd')

const eventsContainer = document.querySelector('#eventsContainer')

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    addEvent();
})


function addEvent() {
    if (eventName.value === "" || eventDate.value === ""){
        return;
    }

    if(dateDiff(eventDate.value) < 0){
        return;
    }

    const newEvent = {
        id: (Math.random() * 100).toString(36).slice(3), 
        name: eventName.value,
        date:eventDate.value,

    }

    events.unshift(newEvent)

    eventName.value = "";

    renderEvents();
}

function dateDiff(d){
    const targetDate = new Date(d)
    const today = new Date()

    const difference = targetDate.getTime() - dateNow.getTime()
    const days = Math.ceil(difference/1000*3600*24)
    return days
}