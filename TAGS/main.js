let tags = []

const inputTagContainer = document.querySelector('#input-tag')
const tagsContainer = document.createElement('div')
const inputTag = document.createElement('span')

inputTag.ariaRoleDescription = 'textbox' //Para temas de accesibilidad
inputTag.contentEditable = 'true'// Hace que nuestro span sea editable, el contenedor se ajusta al tamaño del texto
inputTag.classList.add('input')
inputTag.focus()

inputTagContainer.classList.add("input-tag-container")// Darle estilos a
tagsContainer.classList.add("tag-container")

inputTagContainer.appendChild(tagsContainer)
tagsContainer.appendChild(inputTag)

inputTagContainer.addEventListener("click", e => {
    if(e.target.id === "input-tag" || e.target.classList.contains("tag-container")){
        inputTag.focus()
    }
})

inputTag.addEventListener('keydown', e => {
    if (e.key === 'Enter' && inputTag.textContent !== ''){
        e.preventDefault()
        /*if (tags.length !== 0){//Mi posible solucion
            tags.pop()
        }*/
        if(!existTag(inputTag.textContent)){
            tags.push(inputTag.textContent)
            inputTag.textContent = ''//Elimino el contenido para renderizarlo en una etiqueta en vez de solo texto
            renderTags()
        }
    }else if(e.key === 'Backspace' && inputTag.textContent === '' && tags.length > 0){
        tags.pop()
        renderTags()
    }
       
})

function renderTags(){
    tagsContainer.innerHTML= ''
    const html = tags.map(tag => {
        const tagElement =  document.createElement('div')
        const tagButton = document.createElement('button')

        tagElement.classList.add('tag-item')
        tagButton.textContent = 'X'
        tagButton.addEventListener('click', e =>{
            removeTag(tag)
        })
        tagElement.appendChild(document.createTextNode(tag))
        tagElement.appendChild(tagButton)
        return tagElement
    })
    html.forEach(element => {
        tagsContainer.appendChild(element)
    })
    tagsContainer.appendChild(inputTag)
    inputTag.focus()
}

//Comprobar si existe un valor en el arreglo de tags
function existTag(value){
    return tags.includes(value)
}

//Eliminar Etiqueta
function removeTag(value){
    tags = tags.filter(tag => tag !== value)
    renderTags()
}


