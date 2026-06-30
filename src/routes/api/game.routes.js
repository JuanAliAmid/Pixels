import { Router } from "express";
import gameModel from "../../models/game.model.js";
import gameController from "../../controllers/game.controller.js";

const router = Router();


router.get('/', gameController.getAllGames);//traer todos los juegos

router.post("/", gameController.createGame); // crear nuevo juego

router.put("/:_id", gameController.updateNameById); // actualizo un nombre por id

router.delete("/:nombre", gameController.deleteName);//eliminar por nombre

router.get("/:_id", gameController.lookForById); //buscar por id


export default router;