//Tablero del tic tac toe(con esto se evita el estar constantemente usando el DOM para obtener los valores)
const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

let turn = 0;// 0 = user, 1 = PC

const boardContainer = document.querySelector('#board');
const playerDiv = document.querySelector('#player');

startGame();

function startGame(){
    renderBoard();
    turn =  Math.random() <= 0.5 ? 0 : 1;//Para definir de forma aleatoria si empieza el usuario o la PC

    renderCurrentPlayer();
}

function renderCurrentPlayer(){
    playerDiv.textContent = `${turn === 0 ? 'Player turn': 'PC turn'}`
}

if (turn === 0){
    playerPlays();
}else{
    PCPlays();
}

function playerPlays(){
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, i)=>{
        const row = parseInt(i / 3);
        const column = i % 3;
        
        if(board[row][column] === ""){
            cell.addEventListener("click", (e) => {
                board[row][column] = "O";
                cell.textContent = board[row][column]
            })
        }
    })


}

function PCPlays(){

}

function renderBoard(){
    const html =  board.map(row =>{
        const cells = row.map(cell =>{
            return `<button class= "cell">${cell}</button>`
        })
        return `<div class="row">${cells.join('')}</div>`
    })

    boardContainer.innerHTML = html.join('');
}



