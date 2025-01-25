// Header: importar modulos
import fs from 'fs'
import {writeFile} from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'
import {log} from 'console'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class ProductManager{
    #Products = []
    #id = 1
    constructor(direcc){
        this.direcc = path.join(__dirname, '..', '../memory', direcc)
        this.init()
    }
    // Inicializamos el archivo de productos, si existe lo leemos y si no lo creamos
    init(){
        const file = fs.existsSync(this.direcc)
        if(file){
            this.#Products = JSON.parse(fs.readFileSync(this.direcc, 'utf-8'))
        }else{
            fs.writeFileSync(this.direcc, JSON.stringify(this.#Products, null, 2))
        }
    }

    getProducts(){
        try {
            if(this.#Products.length === 0){ throw new Error('El array de productos está vacío')}
            return this.#Products
        } catch (error) {
            return error.message
        }
    }

    getProductById(id){
        const product = this.#Products.find(product => product.id === id)
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
    getProductsByParams(quantity){
        const products = this.getProducts()
        try {
            if(typeof products === 'string'){throw new Error('No hay productos cargados')}
            const productPage = products.slice(0, quantity) //Slice: es un metodo que devuelve una copia de una parte del array delimitada por los parametros que se le pasen
            return productPage
        } catch (error) {
            return error.message
        }
    }

    async addProduct(product){
        try {
            if(product.title === '' || product.description === '' || product.price === ''|| product.code === ''|| product.stock === ''|| product.category === ''){//Comprobación básica de algunos campos sensibles
                throw new Error('Faltan datos')
            }
            const newProduct = {
                id : this.#Products.length == 0 ? this.#id : this.#Products[this.#Products.length - 1].id + 1,
                title : product.title,
                description : product.description,
                price : product.price,
                thumbnail : product.thumbnail,
                code : product.code,
                stock : product.stock,
                status : product.status || true,
                category : product.category
            }
            this.#Products.push(newProduct)
            const productFile = JSON.stringify(this.#Products, null, 2)
            await writeFile(this.direcc, productFile, 'utf-8')
        } catch (error) {
            return error.message
        }
    }

    async updateProduct(id,product){
        // Utilizamos el metodo getProductById para buscar el producto que queremos actualizar, ya que asi nos evitamos la logica de buscar el producto en el array, y si no existe nos devuelve un mensaje de error
        const searchProduct = this.getProductById(id) 
        try {
            if(typeof searchProduct === 'string'){ throw new Error('El producto no existe')}
            searchProduct.title = product.title
            searchProduct.description = product.description
            searchProduct.price = product.price
            searchProduct.thumbnail = product.thumbnail
            searchProduct.code = product.code
            searchProduct.stock = product.stock
            const productFile = JSON.stringify(this.#Products, null, 2)
            await writeFile(this.direcc, productFile, 'utf-8')
        } catch (error) {
            log(error.message)
            return error.message
        }
    }

    async deleteProduct(id){
        const searchProduct = this.getProductById(id)
        try {
            if(typeof searchProduct === 'string'){ throw new Error('El producto no existe')}
            const index = this.#Products.indexOf(searchProduct)
            this.#Products.splice(index, 1)
            const productFile = JSON.stringify(this.#Products, null, 2)
            await writeFile(this.direcc, productFile, 'utf-8')
        } catch (error) {
            return error.message
        }
    }
}
export const productManager = new ProductManager('products.json')
productManager.init()
export default ProductManager

/*
const productManager = new ProductManager('products.json')
productManager.init()

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

