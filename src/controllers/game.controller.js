import gameModel from "../models/game.model.js";

//======================== game.routes ===============================
const getAllGames = async (req, res) => { //traer todos los juegos
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    try {
        const games = await gameModel.paginate({}, { page, limit });

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

        const { nombre, precio, anio, categoria } = req.body;

        if (!nombre)
            return res.status(400).json({ sucess: false, error: "El campo nombre es requrido" });
        if (!precio)
            return res.status(400).json({ sucess: false, error: "El campo precio es requrido" });
        if (!anio)
            return res.status(400).json({ sucess: false, error: "El campo año es requrido" });

        const newGame = await gameModel.create({
            nombre: nombre,
            categoria: categoria,
            precio: Number(precio),
            anio: Number(anio)
        });

        res.redirect("/products");

    } catch (error) {
        res.status(400).json({ message: 'Error al intentar crear', error });
    }

};


const updateNameById = async (req, res) => { // actualizo un nombre por id
    try {
        const { _id } = req.params;//pedimos el id

        const newName = req.body.nombre; // tenemos el nuevo nombre

        const usuarioActualizado = await gameModel.findByIdAndUpdate(
            _id,
            { $set: { nombre: newName } },
            { new: true, runValidators: true }
        );

        if (usuarioActualizado === null) {
            return res.status(404).json({ success: false, error: `no existen ususarios con id: ${_id}` });
        }

        res.status(200).json({ success: true, payload: newName });

    } catch (error) {
        res.status(404).json({ message: 'Error al intentar actualizar nombre', error });
    }
};


const deleteName = async (req, res) => { //eliminar por id
    try {

        const { _id } = req.params; //user to delete

        const namePosition = await gameModel.deleteOne({ _id: _id }); // We are looking for your position

        if (namePosition.deletedCount === 0) {
            return res.status(404).json({ success: false, error: `No existen juegos con ese nombre ${nombre}` })
        };

        console.log(namePosition.deletedCount);

        return res.status(200).json({ success: true, payload: 'Juego eliminado correctamente' });

    } catch (error) {

        res.status(404).json({ message: 'Error al eliminar', error });

    }
};


const lookForById = async (req, res) => { //buscar por id

    try {

        const { _id } = req.params;

        const game = await gameModel.findById(_id);

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
    try {
        const games = await gameModel.find().lean();
        res.render("products", { tittle: "Lista de juegos", games });
        console.log('Exito al traer los juegos');
    } catch (error) {
        console.error('Hubo un error', error);
    }
}


const lookForByIdViews = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await gameModel.findById(id).lean()
        res.render("product-detail", { game })
    } catch (error) {
        console.error('error al detallar', error)
    }
}

export default {
    getAllGames,
    createGame,
    updateNameById,
    deleteName,
    lookForById,
    getAllGamesViews,
    lookForByIdViews
}