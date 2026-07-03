import { Router } from "express";
import cartModel from "../models/cart.model.js";
import cartController from "../controllers/cart.controller.js";

const router = Router();

router.get("/", (req, res) => { res.render("home") })

router.get("/form", (req, res) => { res.render("form") })

router.get('/cart/:cid', cartController.getAllGamesCart); //traer todos los juegos

export default router;