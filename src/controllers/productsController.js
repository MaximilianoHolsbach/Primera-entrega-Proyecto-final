import ProductManager from '../utils/ProductManager.js';

const productManager = new ProductManager('products.json');

export const addProduct = (req, res)=>{
    try {
        const product = req.body
        if(!product.title || !product.description  || !product.price || !product.code || !product.stock || !product.category ){
            res.status(400).json({
                message : 'Todos los campos son obligatorios'
            })
        }else{
            const newProduct = productManager.addProduct(product)
            res.status(201).json({
                message : newProduct
            })
        }
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
        
    }
}

export const getProducts = (req, res)=>{
    const {limit} = req.query
    if(limit){
        const products = productManager.getProductsByParams(Number(limit))
        res.json(products)
    }else{
        const products = productManager.getProducts()
        res.json(products)
    }
    
}

export const getProductById = (req, res)=>{
    const {id} = req.params
    const product = productManager.getProductById(Number(id))
    res.json(product)
}

export const updateProduct = (req,res)=>{
    try {
        const {id} = req.params
        const product = req.body
        const updatedProduct = productManager.updateProduct(Number(id),product)
        if(updatedProduct === 'string'){
            res.status(404).json({
                message : updatedProduct
            })
        }else{
            res.status(200).json({
                message : updatedProduct,
            })
        }
    } catch (error) {
        res.status(500).json({
            message : error.message
        })  
    }
}

export const deleteProduct = (req, res)=>{
    try {
        const {id} = req.params
        const deleteProduct = productManager.deleteProduct(Number(id))
        if(deleteProduct === 'string'){
            res.status(404).json({
                message : deleteProduct
            })
        }else{
            res.status(200).json({
                message : deleteProduct
            })
        }
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export default{
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}





