import { Router } from "express";
import gameController from "../../controllers/game.controller.js";
import gameFsDao from "../../dao/game.fs.dao.js";

const router = Router();

router.get('/', gameController.getAllGames);//traer todos los juegos

router.get("/fs-test", async (req, res) => {
    const juegos = await gameFsDao.getAllGamesFsDao();
    res.json(juegos);
});

router.get("/fs-test/:id", async (req, res) => {
    const id = Number(req.params.id)
    const juego = await gameFsDao.lookForByIdFsDao(id);
    res.json(juego);
});

router.post("/fs-test", async (req, res) => {
    const juego = await gameFsDao.createGameFsDao(req.body);
    res.json(juego);
});

router.put("/fs-test/:id", async (req, res) => {
    const id = Number(req.params.id);
    const juego = await gameFsDao.updateGameByIdFsDao(id, req.body);
    res.json(juego);
});

router.delete("/fs-test/:id", async (req, res) => {
    const id = Number(req.params.id);
    const juego = await gameFsDao.deleteGameFsDao(id);
    res.json(juego);
});

router.post("/", gameController.createGame); // crear nuevo juego
router.put("/:_id", gameController.updateGameById); // actualizo un nombre por id
router.delete("/:_id", gameController.deleteGame);//eliminar por nombre
router.get("/:_id", gameController.lookForById); //buscar por id

export default router;