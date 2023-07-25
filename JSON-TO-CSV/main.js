const jsonForm = document.querySelector('#jsonform')
const csvForm = document.querySelector('#csvform')
const bConvert = document.querySelector('#bConvert')

bConvert.addEventListener('click', e => {
    ConvertJSONtoCSV();
})

function ConvertJSONtoCSV(){
    let json 
    let keys = []
    let values = []

    try{
        json = JSON.parse(jsonForm.value)
    }catch (error){
        console.log("Formato incorrecto JSON", error)
        alert("Formato incorrecto JSON")
        return
    }

    if(Array.isArray(json)){
        //algoritmo
        json.forEach(item => {
            const nkeys =  Object.keys(item)
            //La primera vez que itero keys esta vacia con el operador de spread le asigno el arreglo nkeys
            if(keys.length === 0){
                keys = [...nkeys]
            }else{
                if(nkeys.length != keys.length){
                    throw new Error("Number of Keys are different")
                }else{
                    console.log("Ok", nkeys)
                }
            }

           // obtengo los valores de cada key
            const row = keys.map(k => {
                return item[k]
            })
            values.push([...row])

        })
        console.log(keys, values)
        console.log(values.unshift(keys))
        const text = values.map(v => v.join(',')).join('\n')
        csvForm.value = text
    }else{
        alert("No es un arreglo de objetos")
    }
}

