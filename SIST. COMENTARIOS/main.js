const comments = []

const inputContainer = document.createElement('div')
const input = document.createElement('input')
const commentsContainer = document.querySelector('#comments-container')
input.classList.add('input')

input.addEventListener('keydown', e => {
    handleEnter(e, null)
})

commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input)

function handleEnter(e, current){
    if(e.key === 'Enter' && e.target.value !== ''){// Si la tecla esta presionada y el valor es diferente de un string vacio
        const newComment = {
            text: e.target.value,
            likes:0,
            responses: []
        }
        if (current ===  null){
            comments.unshift(newComment)
        }else{
            current.responses.unshift(newComment)
        }

        e.target.value = ''
        commentsContainer.innerHTML = ''
        commentsContainer.appendChild(inputContainer)

        renderComments(comments, commentsContainer)
    }
}

function renderComments(arr, parent){
    arr.forEach(element => {
        const commentContainer = document.createElement('div')// Cada comentario va a tener su contenedor
        commentContainer.classList.add('comment-container')

        const responsesContainer = document.createElement('div')//Y a su vez voy a tener otra capa en donde voy a almacenar todas las respuestas
        responsesContainer.classList.add('responses-container')

        const replyButton = document.createElement('button')//Boton de respuesta
        const likeButton = document.createElement('button')//Boton de likes

        const textContainer = document.createElement('div')//Texto del comentario
        textContainer.textContent =  element.text

        const actionsContainer = document.createElement('div')

        replyButton.textContent = 'Reply'
        likeButton.textContent = `${element.likes > 0 ? `${element.likes} likes`: "like"}`

        replyButton.addEventListener('click', e => {
            const newInput = inputContainer.cloneNode(true)//True para clonarlo profundo con sus elementos hijos
            newInput.value = ''//Por si el input principal tiene texto
            newInput.focus()
            newInput.addEventListener("keydown", (e) => {
                handleEnter(e, element)
            })
            commentContainer.insertBefore(newInput, responsesContainer)//Insertamos el input de la respuesta al comentario debajo de reply y antes que el contenedor de las respuestas 
        })
        likeButton.addEventListener('click', e =>{
            element.likes++;
            likeButton.textContent = `${element.likes > 0 ? `${element.likes} likes`: "like"}`
        })

        //apend
        commentContainer.appendChild(textContainer)
        commentContainer.appendChild(actionsContainer)
        actionsContainer.appendChild(replyButton)
        actionsContainer.appendChild(likeButton)

        commentContainer.appendChild(responsesContainer)

        //Cuando no tenemos un limite, no sabemos cuando volver a mandar a llamar a una funcion
        //para eso nos sirve la recursion
        //Para evitar que se cree un bucle, toda funcion de recursividad debe tener un condicionar para evaluar 
        //Cuando salir del loop
        if(element.responses.length > 0){
            renderComments(element.responses, responsesContainer)
        }

        parent.appendChild(commentContainer)
    });

    console.log(comments)
}