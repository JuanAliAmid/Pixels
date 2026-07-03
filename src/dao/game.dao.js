import gameModel from "../models/game.model.js";

//======================== game.routes ===============================

const getAllGamesDao = async (page, limit) => { //traer todos los juegos
    const games = await gameModel.paginate({}, { page, limit });
    return games
}

const createGameDao = async (title, description, code, price, status, stock, category, thumbnails) => { // crear nuevo juego
    const newGame = await gameModel.create({
        title,
        category,
        price: Number(price),
        description,
        code,
        status,
        stock,
        thumbnails
    });
    return newGame
}

const updateGameByIdDao = async (title, description, code, price, status, stock, category, thumbnails, _id) => { // actualizo un JUEGO por id
    const usuarioActualizado = await gameModel.findByIdAndUpdate(
        _id,
        {
            $set: {
                title,
                category,
                price: Number(price),
                description,
                code,
                status,
                stock,
                thumbnails
            }
        },
        { new: true, runValidators: true }
    );
    return usuarioActualizado;
}

const deleteGameDao = async (_id) => { //eliminar por id
    const namePosition = await gameModel.deleteOne({ _id: _id }); // We are looking for your position
    return namePosition;
}

const lookForByIdDao = async (_id) => { //buscar por id
    const game = await gameModel.findById(_id);
    return game;
}

//======================== view.game.routes ===============================

const getAllGamesViewsDao = async () => {
    const games = await gameModel.find().lean();
    return games;
}

const lookForByIdViewsDao = async (id) => {
    const game = await gameModel.findById(id).lean()
    return game;
}

export default {
    getAllGamesDao,
    createGameDao,
    updateGameByIdDao,
    deleteGameDao,
    lookForByIdDao,
    getAllGamesViewsDao,
    lookForByIdViewsDao
}