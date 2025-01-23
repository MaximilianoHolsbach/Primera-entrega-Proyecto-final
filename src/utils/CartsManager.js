// Header: importar modulos
import fs from 'fs'
import {writeFile} from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'
import {log} from 'console'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class CartsManager{
    #Carts = []
    #id = 1
    constructor(direcc){
        this.direcc = path.join(__dirname,'..','../memory', direcc)
        this.init()
    }
    // Inicializamos el archivo del carrito, si existe lo leemos y si no lo creamos
    init(){
        const file = fs.existsSync(this.direcc)
        if(file){
            this.#Carts = JSON.parse(fs.readFileSync(this.direcc, 'utf-8'))
        }else{
            fs.writeFileSync(this.direcc, JSON.stringify(this.#Carts, null, 2))
        }
    }
    async createCart(){
        const newCart = {
            id : this.#Carts.length == 0 ? this.#id : this.#Carts[this.#Carts.length - 1].id + 1,
            products : []
        }
        this.#Carts.push(newCart)
        await writeFile(this.direcc, JSON.stringify(this.#Carts, null, 2))
        log(`Carrito creado con id: ${newCart.id}`)
        return newCart
    }
    async addProductToCart(cartId, productId, quantity){
        const cart = this.#Carts.find(cart => cart.id === cartId)
        try {
            if(!cart){throw new Error('El carrito no existe')}
            const searchProduct = cart.products.find(product => product.productId === productId)
            if(searchProduct){
                searchProduct.quantity += quantity
            }else{
                cart.products.push({productId, quantity})
            }
            this.#Carts = this.#Carts.map(cart => cart.id === cartId ? cart : cart)
            await writeFile(this.direcc, JSON.stringify(this.#Carts,null,2))
            log(`Producto agregado al carrito ${cartId}`)
        } catch (error) {
            log(error.message)
            return error.message
        }
    }
    getCart(cartId){
        const cart = this.#Carts.find(cart => cart.id === cartId)
        try {
            if(!cart){throw new Error('El carrito no existe')}
            const products = cart.products
            log(products)
            return products
        } catch (error) {
            log(error.message)
            return error.message
        }
    }
}

const cartsManager = new CartsManager('carts.json')

cartsManager.init()

//cartsManager.createCart();

//cartsManager.addProductToCart(1, 3, 2);

cartsManager.getCart(2);

export default cartsManager;
