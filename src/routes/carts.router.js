import { response, Router } from "express";
import CartsManager from '../utils/CartsManager.js'

export const CartsRouter = Router();

CartsRouter.get('/:id', (req, res) => {
    try {
        const { id } = req.params
        const carts = CartsManager.getCart(Number(id))
        if(carts === 'string'){
            return res.status(404).json({
                success: false,
                response: carts
            })
        }else{
            return res.status(200).json({
                success: true,
                response: carts
            })
        }
    } catch (error) {
        return res.status(500).json({
            succes : false,
            response : error.message
        })
    }
});

