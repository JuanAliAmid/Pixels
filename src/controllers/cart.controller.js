import cartModel from "../models/cart.model.js";

//============================= views.router ===============================
const getAllGamesCart = async (req, res) => { //traer todos los juegos
    try {

        const games = await cartModel.find().lean();
        const totalJuegos = games[0].productos.length;
        const totalMonto = games[0].productos.reduce((a, b) => { return a + b.precio }, 0)

        res.render('cart', { games, totalJuegos, totalMonto });

    } catch (error) {
        res.status(400).json({ success: false, error: "no existen juegos", error });
    }
}

//=================================== cart.routes ====================================
const modifyGame = async (req, res) => { //modificar juego
    try {
        const { img, nombre, precio } = req.body;


        if (!nombre)
            return res.status(400).json({ sucess: false, error: "El campo nombre es requrido" });
        if (!precio)
            return res.status(400).json({ sucess: false, error: "El campo precio es requrido" });


        const newGame = await cartModel.findOneAndUpdate(
            {},
            { $push: { productos: { nombre, precio } } },
            { upsert: true, new: true }
        );

        res.status(201).json({ success: true, payload: newGame });
    } catch (error) {
        res.status(400).json({ message: 'Error al intentar crear', error });
    }

}


const deleteGameById = async (req, res) => { //eliminar por id
    const { productoId } = req.params;
        console.log('DELETE recibido, productoId:', productoId);

    try {
        await cartModel.findOneAndUpdate (
            {},
            { $pull: { productos: { _id: productoId } } }
        )
        res.status(200).json({ succes: true })
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar', error })
    }
}

export default {
    getAllGamesCart,
    modifyGame,
    deleteGameById
}