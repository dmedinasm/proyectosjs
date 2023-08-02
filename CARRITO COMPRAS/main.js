const db = {
    methods: {
        find: (id) => {
            return db.items.find(item => item.id === id)
        },
        // Este metodo lo vamos a utilizar cuando hagamos la compra en nuestro carrito de compra
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
                const found = db.items.find(item.id)
                return (acc += found.price * item.qty)
            })
            return total
        },//Suma de los elementos de mi carrito de compra
        hasInventory: (id, qty) => {
            return db.items.find(item => item.id === id).qty >= 0// Evalua si realmente existen en inventario esta cantidad de x articulos
        },//No puedo comprar mas que el inventario que actualmente existe
        purchase: () =>{}//Compra todo lo que tengo en el carrito de compra
    }
}