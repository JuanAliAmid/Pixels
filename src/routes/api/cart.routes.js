import { Router } from "express";
import cartModel from "../../models/cart.model.js";
import cartController from "../../controllers/cart.controller.js";

const router = Router()

router.get('/:cid', cartController.listProducts) //busca por id

router.post('/', cartController.createCart) //crea

router.post('/:cid/products/:pid', cartController.quantityProducts) //aumentar cantidad, si no hay se crea

router.put('/:cid', cartController.updateProductos) //reemplazar productos

router.put('/:cid/products/:pid', cartController.updateQuantity) //actualizar cantidad

router.delete('/:cid', cartController.emptyCart) //vaciar carrito

router.delete('/:cid/products/:pid', cartController.deleteGameById) //eliminar por id

export default router;

