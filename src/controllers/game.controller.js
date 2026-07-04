import gameDao from "../dao/game.dao.js";

//======================== game.routes ===============================
const getAllGames = async (req, res) => { //traer todos los juegos
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sort = req.query.sort;
    const query = req.query.query;

    try {

        const games = await gameDao.getAllGamesDao(page, limit, sort, query)

        if (games.docs.length === 0) {
            return res.status(400).json({ success: false, error: "no existen juegos" });
        }

        res.status(200).json({
            status: "success",
            payload: games.docs,
            totalPages: games.totalPages,
            prevPage: games.prevPage,
            nextPage: games.nextPage,
            page: games.page,
            hasPrevPage: games.hasPrevPage,
            hasNextPage: games.hasNextPage,
            prevLink: null,
            nextLink: null
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "no existen juegos", error });
    }
};


const createGame = async (req, res) => { // crear nuevo juego

    try {

        const { title, description, code, price, status, stock, category, thumbnails } = req.body;

        if (!title)
            return res.status(400).json({ sucess: false, error: "El campo nombre es requrido" });
        if (!price)
            return res.status(400).json({ sucess: false, error: "El campo precio es requrido" });


        const newGame = await gameDao.createGameDao(title, description, code, price, status, stock, category, thumbnails)

        const io = req.app.get('io');
        io.emit('productoCreado', newGame);

        res.redirect("/products");

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error al intentar crear', error });
    }

};


const updateGameById = async (req, res) => { // actualizo un JUEGO por id
    try {
        const { _id } = req.params;//pedimos el id

        const { title, description, code, price, status, stock, category, thumbnails } = req.body;

        const usuarioActualizado = await gameDao.updateGameByIdDao(title, description, code, price, status, stock, category, thumbnails, _id)

        if (usuarioActualizado === null) {
            return res.status(404).json({ success: false, error: `no existen ususarios con id: ${_id}` });
        }

        const io = req.app.get('io');
        io.emit('productoActualizado', usuarioActualizado);

        res.status(200).json({ success: true, payload: usuarioActualizado });

    } catch (error) {
        res.status(404).json({ message: 'Error al intentar actualizar nombre', error });
    }
};


const deleteGame = async (req, res) => { //eliminar por id
    try {

        const { _id } = req.params; //user to delete

        const namePosition = await gameDao.deleteGameDao(_id)

        if (namePosition.deletedCount === 0) {
            return res.status(404).json({ success: false, error: `No existen juegos con ese nombre ${_id}` })
        };

        const io = req.app.get('io');
        io.emit('productoEliminado', _id);

        return res.status(200).json({ success: true, payload: 'Juego eliminado correctamente' });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Error al eliminar', error });

    }
};


const lookForById = async (req, res) => { //buscar por id

    try {

        const { _id } = req.params;

        const game = await gameDao.lookForByIdDao(_id);

        if (!game) {
            return res.status(404).json({ success: false, error: `no existen ususarios con id: ${_id}` });
        };

        res.status(200).json({ success: true, playload: game });

    } catch (error) {
        res.status(404).json({ message: 'Error al buscar juego', error })
    }

};

//======================== view.game.routes ===============================
const getAllGamesViews = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sort = req.query.sort;
    const query = req.query.query;
    try {
        const games = await gameDao.getAllGamesDao(page, limit, sort, query);

        res.render("products", { tittle: "Lista de juegos", games: games.docs, totalPages: games.totalPages, hasNextPage: games.hasNextPage, hasPrevPage: games.hasPrevPage, nextPage: games.nextPage, prevPage: games.prevPage });

        console.log('Exito al traer los juegos');
    } catch (error) {
        console.error('Hubo un error', error);
    }
}


const lookForByIdViews = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await gameDao.lookForByIdViewsDao(id)
        res.render("product-detail", { game })
    } catch (error) {
        console.error('error al detallar', error)
    }
}

export default {
    getAllGames,
    createGame,
    updateGameById,
    deleteGame,
    lookForById,
    getAllGamesViews,
    lookForByIdViews
}