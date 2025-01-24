import { Router } from "express";
import productManager from "../utils/ProductManager.js";


export const ProductsRouter = Router();

ProductsRouter.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        response: productManager.getProducts()
    })
});

ProductsRouter.get('/:id', (req, res) => {
    try {
        const { id } = req.params
        const product = productManager.getProductById(Number(id))
        if(product === 'string'){
            return res.status(404).json({
                success: false,
                response: product
            })
        }else{
            return res.status(200).json({
                success: true,
                response: product
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            response: error.message
        })
        
    }
});