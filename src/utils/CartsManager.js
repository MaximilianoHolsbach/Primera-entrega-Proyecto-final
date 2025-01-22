// Header: importar modulos
import fs from 'fs'
import {writeFile} from 'fs/promises'
//import { fileURLToPath } from 'url'
import path from 'path'
import {log} from 'console'
//const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class CartsManager{
    #Carts = []
    #id = 1
    constructor(direcc){
        this.direcc = path.join(__dirname, '..', 'memoria', direcc)
        this.init()
    }
    // Inicializamos el archivo de productos, si existe lo leemos y si no lo creamos
    init(){
        const file = fs.existsSync(this.direcc)
        if(file){
            this.#Carts = JSON.parse(fs.readFileSync(this.direcc, 'utf-8'))
        }else{
            fs.writeFileSync(this.direcc, JSON.stringify(this.#Carts, null, 2))
        }
    }

    getCarts(){
        try {
            if(this.#Carts.length === 0){ throw new Error('El array de productos está vacío')}
            return this.#Carts
        } catch (error) {
            return error.message
        }
    }

    getCartsById(id){
        const product = this.#Carts.find(product => product.id === id)
        try {
            if(!product){
                throw new Error('El producto no existe')
            }
            return product
        } catch (error) {
            return error.message
        }
    }
    // Devuelve los productos en base a la cantidad que se le pase por parámetro
    getCartsByParams(quantity){
        const Carts = this.getCarts()
        try {
            if(typeof Carts === 'string'){throw new Error('No hay productos cargados')}
            const CartsPage = Carts.slice(0, quantity) //Slice: es un metodo que devuelve una copia de una parte del array delimitada por los parametros que se le pasen
            return CartsPage
        } catch (error) {
            return error.message
        }
    }

    async addCarts(Carts){
        try {
            if(Carts.name === '' || Carts.price === '' || Carts.stock === ''){//Comprobación básica de algunos campos sensibles
                throw new Error('Faltan datos')
            }
            const newProduct = {
                id : this.#Carts.length == 0 ? this.#id : this.#Carts[this.#Carts.length - 1].id + 1,
                title : Carts.title,
                description : Carts.description,
                price : Carts.price,
                thumbnail : Carts.thumbnail,
                code : Carts.code,
                stock : Carts.stock
            }
            this.#Carts.push(newProduct)
            const CartsFile = JSON.stringify(this.#Carts, null, 2)
            await writeFile(this.direcc, CartsFile, 'utf-8')
        } catch (error) {
            return error.message
        }
    }

    async updateCarts(id,Carts){
        // Utilizamos el metodo getProductById para buscar el producto que queremos actualizar, ya que asi nos evitamos la logica de buscar el producto en el array, y si no existe nos devuelve un mensaje de error
        const searchCarts = this.getCartsById(id) 
        try {
            if(typeof searchCarts === 'string'){ throw new Error('El producto no existe')}
            searchCarts.title = Carts.title
            searchCarts.description = Carts.description
            searchCarts.price = Carts.price
            searchCarts.thumbnail = Carts.thumbnail
            searchCarts.code = Carts.code
            searchCarts.stock = Carts.stock
            const CartsFile = JSON.stringify(this.#Carts, null, 2)
            await writeFile(this.direcc, CartsFile, 'utf-8')
        } catch (error) {
            log(error.message)
            return error.message
        }
    }

    async deleteCarts(id){
        const searchCarts = this.getCartsById(id)
        try {
            if(typeof searchCarts === 'string'){ throw new Error('El producto no existe')}
            const index = this.#Carts.indexOf(searchCarts)
            this.#Carts.splice(index, 1)
            const CartsFile = JSON.stringify(this.#Carts, null, 2)
            await writeFile(this.direcc, CartsFile, 'utf-8')
        } catch (error) {
            return error.message
        }
    }
}

const cartsManager = new CartsManager('carts.json')

cartsManager.init()

export default cartsManager
/*
productManager.addProduct({
    title : 'Harry Potter and the Philosophers Stone',
    description : 'Harry Potter and the Philosophers Stone is the first novel in the Harry Potter series and J.K. Rowlings debut novel, first published in 1997 by Bloomsbury.',
    price : 100,
    thumbnail : 'https://www.google.com',
    code : 'COD1',
    stock : 10
})
productManager.addProduct({
    title : 'Harry Potter and the Chamber of Secrets',
    description : 'Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J.K. Rowling and the second novel in the Harry Potter series.',
    price : 100,
    thumbnail : 'https://www.google.com',
    code : 'COD2',
    stock : 10
})
productManager.addProduct({
    title : 'Harry Potter and the Prisoner of Azkaban',
    description : 'Harry Potter and the Prisoner of Azkaban is a fantasy novel written by British author J.K. Rowling and is the third in the Harry Potter series.',
    price : 100,
    thumbnail : 'https://www.google.com',
    code : 'COD3',
    stock : 10
})
productManager.addProduct({
    title : 'Harry Potter and the Goblet of Fire',
    description : 'Harry Potter and the Goblet of Fire is a fantasy book written by British author J.K. Rowling and the fourth novel in the Harry Potter series.',
    price : 100,
    thumbnail : 'https://www.google.com',
    code : 'COD4',
    stock : 10
})
productManager.addProduct({
    title : 'Harry Potter and the Order of the Phoenix',
    description : 'Harry Potter and the Order of the Phoenix is a fantasy novel written by British author J.K. Rowling and the fifth novel in the Harry Potter series.',
    price : 100,
    thumbnail : 'https://www.google.com',
    code : 'COD5',
    stock : 10
})
productManager.addProduct({
    title : 'Harry Potter and the Half-Blood Prince',
    description : 'Harry Potter and the Half-Blood Prince is a fantasy novel written by British author J.K. Rowling and the sixth novel in the Harry Potter series.',
    price : 100,
    thumbnail : 'https://www.google.com',
    code : 'COD6',
    stock : 10
})
productManager.addProduct({
    title : 'Harry Potter and the Deathly Hallows',
    description : 'Harry Potter and the Deathly Hallows is a fantasy novel written by British author J.K. Rowling and the seventh and final novel of the Harry Potter series.',
    price : 100,
    thumbnail : 'https://www.google.com',
    code : 'COD7',
    stock : 10
})
productManager.addProduct({
    title : 'The Tales of Beedle the Bard',
    description : 'The Tales of Beedle the Bard is a book of children\'s stories by J.K. Rowling.',
    price : 50,
    thumbnail : 'https://www.google.com',
    code : 'COD8',
    stock : 5
})
productManager.addProduct({
    title : 'Fantastic Beasts and Where to Find Them',
    description : 'Fantastic Beasts and Where to Find Them is a 2001 guide book written by British author J.K. Rowling under the pen name of the fictitious author Newt Scamander about the magical creatures in the Harry Potter universe.',
    price : 50,
    thumbnail : 'https://www.google.com',
    code : 'COD9',
    stock : 5
})
productManager.addProduct({
    title : 'A Magical Year',
    description : 'A Magical Year is a book of children\'s stories by J.K. Rowling.',
    price : 50,
    thumbnail : 'https://www.google.com',
    code : 'COD10',
    stock : 10
})
productManager.addProduct({
    title : 'Quidditch Through the Ages',
    description : 'Quidditch Through the Ages is a 2001 book written by British author J.K. Rowling using the pseudonym of Kennilworthy Whisp about Quidditch in the Harry Potter universe.',
    price : 50,
    thumbnail : 'https://www.google.com',
    code : 'COD11',
    stock : 5
})
*/
//log(productManager.getProducts())

//log(productManager.getProductById(5))
/*
productManager.updateProduct(5,{
    title : 'Harry Potter and the Philosophers Stone',
    description : 'Harry Potter and the Philosophers Stone is the first novel in the Harry Potter series and J.K. Rowlings debut novel, first published in 1997 by Bloomsbury.',
    price : 90,
    thumbnail : 'https://www.google.com',
    code : 'COD1',
    stock : 10
})
*/
//log(productManager.getProductById(4))

//productManager.deleteProduct(4)

//productManager.getProducts()

//productManager.getProductsByParams(2)

