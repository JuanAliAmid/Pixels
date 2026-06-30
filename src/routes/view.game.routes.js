import { Router } from "express"
import gameModel from "../models/game.model.js";
import gameController from "../controllers/game.controller.js";

const router = Router()

router.get("/", gameController.getAllGamesViews);

router.get("/:id", gameController.lookForByIdViews)

export default router;