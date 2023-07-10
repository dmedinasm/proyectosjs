const inputCard = document.querySelector('#inputCard')
const inputDate = document.querySelector('#inputDate')
const inputCVV = document.querySelector('#inputCVV')

const maskNumber ='####-####-####-####'
const maskDate = '##/##'
const maskCVV = '###'

let current = " "
let cardNumber = []
let dateNumber = []
let cvvNumber = []


inputCard.addEventListener("keydown", (e) =>{
    //Si presiono tab no hago nada ya que es para cambiar de un input a otro
    if(e.key === 'Tab'){
        return
    }

    e.preventDefault(); //Prevenimos cualquier comportamiento no deseado
    handleInput(maskNumber, e.key, cardNumber)
    inputCard.value = cardNumber.join("")// Despues de manipular el input, se quedan strings separados, los cuales unimos mediante join
})

inputDate.addEventListener("keydown", (e) => {
    if(e.key === 'Tab'){
        return
    }

    e.preventDefault(); 
    handleInput(maskDate, e.key, dateNumber)
    inputDate.value = dateNumber.join("")
})

inputCVV.addEventListener("keydown", (e) => {
    if(e.key === 'Tab'){
        return
    }

    e.preventDefault(); 
    handleInput(maskCVV, e.key, cvvNumber)
    inputCVV.value = cvvNumber.join("")
})

//Limitamos el numero de caracteres y le agregamos formato especial con simbolo
function handleInput(mask, key, arr){
    let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

    //Si presionamos tecla backspace y hay elementos dentro del array parametro la eliminamos
    if (key === "Backspace" && arr.length > 0){
        arr.pop()
        return
    }

    if (numbers.includes(key) && arr.length + 1 <= mask.length){//Si la tecla presionada es un numero y el arreglo parametro es menor que la longitud de la mascara se cumple la condicion
        if (mask[arr.length] === "-" || mask[arr.length] === "/"){
            arr.push(mask[arr.length], key)
        }else{
            arr.push(key)
        }
    }
}

