//Tablero del tic tac toe(con esto se evita el estar constantemente usando el DOM para obtener los valores)
const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

let turn = 0;// 0 = user, 1 = PC

const boardContainer = document.querySelector('#board');
const playerDiv = document.querySelector('#player');

renderBoard();

function renderBoard(){
    const html =  board.map(row =>{
        const cells = row.map(cell =>{
            return `<button class= "cell">${cell}</button>`
        })
        return `<div class="row">${cells.join('')}</div>`
    })

    boardContainer.innerHTML = html.join('');
}

