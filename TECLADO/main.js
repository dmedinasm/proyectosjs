const keys = [
    [
        ["1", "!"],
        ["2", "@"],
        ["3", "#"],
        ["4", "$"],
        ["5", "%"],
        ["6", "^"],
        ["7", "&"],
        ["8", "*"],
        ["9", "("],
        ["0", ")"],
        ["-", "_"],
        ["=", "+"]
    ],// primera fila
    [
        ["q", "Q"],
        ["w", "W"],
        ["e", "E"],
        ["r", "R"],
        ["t", "T"],
        ["y", "Y"],
        ["u", "U"],
        ["i", "I"],
        ["o", "O"],
        ["p", "P"],
        ["[", "{"],
        ["]", "}"]
    ],
    [
        ["MAYUS", "MAYUS"],
        ["a", "A"],
        ["s", "S"],
        ["d", "D"],
        ["f", "F"],
        ["g", "G"],
        ["h", "H"],
        ["j", "J"],
        ["k", "K"],
        ["l", "L"],
        [";", ":"],
        ["'", '"'] 
    ],
    [
        ["SHIFT", "SHIFT"],
        ["z", "Z"],
        ["x", "X"],
        ["c", "C"],
        ["v", "V"],
        ["b", "B"],
        ["n", "N"],
        ["m", "M"],
        [",", "<"],
        [".", ">"]
    ],
    [
        ["SPACE", "SPACE"],
    ]//ultima fila
]

let mayus = false 
let shift = false

renderKeyboard()

function renderKeyboard(){
    const keyboardContainer = document.querySelector('#keyboard-container');
    let empty =`<div class="key-empty></div>` // Para hacer efecto de espacio vacio

    // Arreglo mutidimensional, el primer map es para el arreglo principal y el segundo map para cada arreglo dentro del principal 
    const layers = keys.map((layer) => {
        return layer.map(key =>{
            if(key[0] === "SHIFT") {
                return `<button class="key key-shift">${key[0]}</button>`
            }
            if(key[0] === "MAYUS") {
                return `<button class="key key-mayus">${key[0]}</button>`
            }

            if (key[0] === "SPACE"){
                return `<button class="key key-space"></button>`
            }

            return `
            <button class="key key-normal">${shift ? key[1] : mayus && key[0].tolowerCase().charCodeAt(0) >= 97 &&
                                                                       key[0].tolowerCase().charCodeAt(0) <= 122
                                                                       ? key[1]
                                                                       : key[0]
             }</button>
            `

        })
    })

    //layers[0].push(empty)//
    //layers[1].unshift(empty)//

    const htmlLayers =  layers.map((layer) => {
        return layer.join("")
    })
    
    keyboardContainer.innerHTML = ""

    htmlLayers.forEach(layer => {
        keyboardContainer.innerHTML += `<div class="layer">${layer}</div>`
    })
}