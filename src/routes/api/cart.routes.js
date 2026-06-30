import { Router } from "express";
import cartModel from "../../models/cart.model.js";
import cartController from "../../controllers/cart.controller.js";

const router = Router()

router.post('/', cartController.modifyGame) //modifica

router.delete('/:productoId', cartController.deleteGameById) //eliminar por id

export default router;

