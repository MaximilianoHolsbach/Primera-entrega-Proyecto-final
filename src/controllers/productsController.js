import ProductManager from '../utils/ProductManager.js';

const productManager = new ProductManager('products.json');

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

export const addProduct = (req, res)=>{
    const product = req.body
    const newProduct = productManager.addProduct(product)
    res.json(newProduct)
}


export default{
    getProducts,
    addProduct
}





