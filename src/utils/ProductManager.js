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
            return 'Producto agregado'
        } catch (error) {
            return error.message
        }
    }

    updateProduct(id,product){
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
            writeFile(this.direcc, productFile, 'utf-8')
            return "Producto actualizado"
        } catch (error) {
            log(error.message)
            return error.message
        }
    }

    deleteProduct(id){
        const searchProduct = this.getProductById(id)
        try {
            if(typeof searchProduct === 'string'){ throw new Error('El producto no existe')}
            const index = this.#Products.indexOf(searchProduct)
            this.#Products.splice(index, 1)
            const productFile = JSON.stringify(this.#Products, null, 2)
            writeFile(this.direcc, productFile, 'utf-8')
            return "Producto eliminado"
        } catch (error) {
            return error.message
        }
    }
}
export const productManager = new ProductManager('products.json')
productManager.init()
export default ProductManager
