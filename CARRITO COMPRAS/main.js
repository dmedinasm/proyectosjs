const db = {
    methods: {
        find: (id) => {
            return db.items.find(item => item.id === id)
        },
        // Este metodo lo vamos a utilizar cuando hagamos la compra en nuestro carrito de compra, se elimina producto del stock de db
        remove: (items) => {
            items.forEach(item => {
                const product =  db.methods.find(item.id)
                product.qty = product.qty - item.qty
            });

            //Se puede expandir la funcionalidad y poner mas metodos

            console.log(db)
        },
    },
    items:[
        {
            id:0,
            title: 'Funko Pop',
            price: 250,
            qty: 5
        },
        {
            id:1,
            title: 'Harry Potter',
            price: 345,
            qty: 50
        },
        {
            id:2,
            title: 'Phillis Hue',
            price: 1300,
            qty: 80
        },
        {
            id:3,
            title: 'Ipod',
            price: 6000,
            qty: 8
        }
    ]
}

//El shopping cart es independiente de la base de datos pero va a utilizar la base de datos para encontrar elementos
// En el carrito de compra manejar solo los id por si hubo algun cambio enla base de datos del producto, traer de la bd los productos a traves del id
const shoppingCart = {
    items:[],
    methods:{
        add:(id, qty) => {
            const cartItem = shoppingCart.methods.get(id)

            if(cartItem){
                if(shoppingCart.methods.hasInventory(id, qty + cartItem.qty)){//No voy a pedir solo lo que estoy anadiendo, sino lo que tengo actualemnte en el carrito
                    cartItem.qty += qty
                }else{
                    alert('No hay inventario suficiente')
                }
            }else{
                shoppingCart.items.push({id, qty})
            }

        },//Que elemento voy a eliminar y cuantos elementos de mi carrito de compra voy a eliminar
        remove: (id, qty) =>{
           const  cartItem = shoppingCart.methods.get(id)

           if(cartItem.qty - qty > 0){
            cartItem.qty -= qty
           }else{
            shoppingCart.items = shoppingCart.items.filter(item => item.id !== id )//Actualizo los items del carrito de compra eliminando el que no tiene inventario
           }
        },//Eliminar del carrito
        count: () =>{
            return shoppingCart.items.reduce((acc, item) => acc + item.qty, 0)//Aqui estoy sumando la cantidad de productos, o sea la suma total de la cantidad de cada producto
        },
        get: (id) =>{
            const index =  shoppingCart.items.findIndex(item => item.id === id)
            return index >= 0 ? shoppingCart.items[index] : null
        },
        getTotal:() => {
            const total = shoppingCart.items.reduce((acc, item) => {//Aqui utilizo el metodo reduce para obtener el valor total de la compra, suma total de precio de cada producto * cantidad del producto
                const found = (db.methods.find(item.id))
                return acc + found.price * item.qty
            }, 0)
            return total
        },//Suma de los elementos de mi carrito de compra
        hasInventory: (id, qty) => {
            return db.items.find(item => item.id === id).qty - qty >= 0// Evalua si realmente existen en inventario esta cantidad de x articulos
        },//No puedo comprar mas que el inventario que actualmente existe
        purchase: () =>{
            db.methods.remove(shoppingCart.items)//Al comprar los productos eliminamos de la base de datos del total de existencias de cada producto sustraemos la cantidad(qty) del producto que compramos
            shoppingCart.items = []
        }//Compra todo lo que tengo en el carrito de compra
    }
}


// Lo primero que quiero que aparezca es la tienda, los elementos que puedo comprar
renderStore()

function renderStore(){
    const html = db.items.map(item => {
        return `
            <div class= "item">
                 <div class="title">${item.title}</div>
                 <div class="price">${numberToCurrency(item.price)}</div>
                 <div class="qty">${item.qty} units</div>

                 <div class="actions">
                     <button class="add" data-id="${item.id}">Add to Shopping Cart</button>
                 </div>
            </div>
        `
    })
    
    document.querySelector('#store-container').innerHTML = (html.join(""))//Une todos los strings del array a un solo string

    document.querySelectorAll('.item .actions .add').forEach(button =>{
        button.addEventListener('click', e =>{
            const id = parseInt(button.getAttribute("data-id"))//id es de tipo number necesito llevarlo a number ya que .getAtribute me lo de en string 
            const item = db.methods.find(id)
            if(item && item.qty - 1 > 0){
                //anadir a ShoppingCart
                shoppingCart.methods.add(id, 1)
                renderShoppingCart()
            }else {
                console.log('Ya no hay inventario')
            }
        } )
    })
}


//Convertir numero a moneda dolar
function numberToCurrency(n){
    return new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: 2,
        style: "currency",
        currency: "USD",
    }).format(n)
}

function renderShoppingCart(){
    const html = shoppingCart.items.map(item =>{
        const dbItem = db.methods.find(item.id)

        return`
            <div class="item">
              <div class="title">${dbItem.title}</div>
              <div class="price">${numberToCurrency(dbItem.price)}</div>
              <div class="qty">${item.qty} units</div>
              <subtotal class="subtotal">Subtotal:${numberToCurrency(item.qty * dbItem.price)}</div>
              <div class="actions">
                   <button class="addOne" data-id="${item.id}">+</button>
                   <button class="removeOne" data-id="${item.id}">-</button>
              </div>
            </div>
        `

    })

    const closeButton =` 
         <div class="cart-header">
              <button class="bClose">Close</button>
         </div>
    `

    const purchaseButton = shoppingCart.items.length > 0 ? 
    `<div class="cart-actions">
      <button id="bPurchase">Purchase</button>
    </div>`
     : ''

    const total = shoppingCart.methods.getTotal()
    const totalContainer = `<div class="total">Total: ${numberToCurrency(total)}</div>`

    const shoppingCartContainer = document.querySelector('#shopping-cart-container')
    shoppingCartContainer.classList.add("show")
    shoppingCartContainer.classList.remove("hide")
    shoppingCartContainer.innerHTML = closeButton + html.join("") + totalContainer + purchaseButton // este es el html del carrito de compra

    document.querySelectorAll('.addOne').forEach(button =>{
        button.addEventListener('click', e =>{
            const id = parseInt(button.getAttribute("data-id"))
            shoppingCart.methods.add(id, 1)
            renderShoppingCart()
        })
    })

    document.querySelectorAll('.removeOne').forEach(button =>{
        button.addEventListener('click', e =>{
            const id = parseInt(button.getAttribute("data-id"))
            shoppingCart.methods.remove(id, 1)
            renderShoppingCart()
        })
    })

    document.querySelector('.bClose').addEventListener('click', e =>{
        shoppingCartContainer.classList.remove("show")
        shoppingCartContainer.classList.add("hide")
    })

    const bPurchase = document.querySelector('#bPurchase')
    if(bPurchase){//Ya con el simple hecho de que exista el boton de compra significa que si esta en inventario el producto
        bPurchase.addEventListener('click', e => {
            shoppingCart.methods.purchase()
            renderStore()
            renderShoppingCart()
            shoppingCartContainer.innerHTML = ''
            shoppingCartContainer.classList.add("hide")
        })
    }
}
