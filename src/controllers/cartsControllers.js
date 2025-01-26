import cartsManager from '../utils/CartsManager.js'

const cartsController = new cartsManager('carts.json')

export const createCart = (req, res)=>{
    const newCart = cartsController.createCart()
    res.status(200).json({
        status : true,
        message : newCart
    })
}

export const getCart = (req, res)=>{
    try {
        const {id} = req.params
        const cart = cartsController.getCart(Number(id))
        if(cart === 'string'){
            res.status(404).json({
                message : cart
            })
        }else{
            res.status(200).json({
                message : cart
            })
        }
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export const addProductToCart = (req, res)=>{
    try {
        const {cid, pid} = req.params
        const {quantity} = req.body
        if(quantity <= 0){
            res.status(400).json({
                message : 'La cantidad debe ser mayor a 0'
            })
        }else{
            const message = cartsController.addProductToCart(Number(cid), Number(pid), quantity)
            if(message === 'string'){
                res.status(404).json({
                    message
                })
            }else{
                res.status(200).json({
                    message
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
        
    }
}

export default{
    createCart,
    getCart,
    addProductToCart
}