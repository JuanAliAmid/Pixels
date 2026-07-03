import cartDao from "../dao/cart.dao.js";

//============================= views.router ===============================
const getAllGamesCart = async (req, res) => { //traer todos los juegos
    const { cid } = req.params;
    try {

        const games = await cartDao.listProductsDao(cid);
        if (!games) {
            return res.status(404).render('error', { message: 'Error, id inexistente', status: 404 })
        }
        const totalJuegos = games.productos.length;
        const totalMonto = games.productos.reduce((a, b) => { return a + b.product.price }, 0)

        res.render('cart', { games, totalJuegos, totalMonto });

    } catch (error) {
        res.status(400).render('error', { message: 'Error al traer juegos', error, status: 400 });
    }
}

//=================================== cart.routes ====================================

const listProducts = async (req, res) => { //lista los juegos
    const { cid } = req.params;
    try {
        const gameFound = await cartDao.listProductsDao(cid)
        res.status(200).json({ success: true, payload: gameFound });
    } catch (error) {
        res.status(400).json({ message: 'error al buscar por id', error })
    }
}

const updateProductos = async (req, res) => { // reemplazar productos
    const { cid } = req.params;
    const { productos } = req.body;
    try {
        const replaceProduct = await cartDao.updateProductosDao(cid, productos)
        if (!replaceProduct) {
            return res.status(404).json({ message: 'Error al reemplazar' })
        }
        res.status(200).json({ success: true, payload: replaceProduct })
    } catch (error) {
        return res.status(400).json({ message: 'Error al reemplazar', error })
    }
}

const updateQuantity = async (req, res) => { //Actualizar cantidad
    const { cid } = req.params;
    const { pid } = req.params;
    const { quantity } = req.body;
    try {
        const newQuantity = await cartDao.updateQuantityDao(cid, pid, quantity);
        if (!newQuantity) {
            return res.status(404).json({ message: 'Error al actualizar cantidad' })
        }
        res.status(200).json(({ success: true, payload: newQuantity }))
    } catch (error) {
        return res.status(400).json({ message: 'Error al actualizar', error })
    }
}

const emptyCart = async (req, res) => { //vaciar carrito
    const { cid } = req.params;
    try {
        const empty = await cartDao.emptyCartDao(cid)
        res.status(200).json({ success: true, payload: empty })
    } catch (error) {
        res.status(400).json({ message: 'Error al vaciar carrito', error })
    }
}


const quantityProducts = async (req, res) => { // aumentar cantidad sino tiene crearla
    const { cid } = req.params;
    const { pid } = req.params;
    try {
        const newQuantity = await cartDao.quantityProductsDao(cid, pid);
        if (!newQuantity) {
            return res.status(404).json({ message: 'id inexistente' })
        }
        res.status(200).json({ success: true, payload: newQuantity })
    } catch (error) {
        res.status(400).json({ message: 'Error al intentar modificar cantidad', error });
    }
}


const createCart = async (req, res) => { //crear un cart
    try {
        const newCart = await cartDao.createCartDao()
        res.status(201).json({ success: true, payload: newCart });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear', error });
    }
}

const deleteGameById = async (req, res) => { //eliminar por id
    const { pid } = req.params;
    const { cid } = req.params

    try {
        const pid2 = await cartDao.deleteGameByIdDao(cid, pid);
        if (!pid2) {
            return res.status(404).json({ message: 'id inexistente' })
        }
        res.status(200).json({ succes: true, payload: pid2 })
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar', error })
    }
}

export default {
    getAllGamesCart,
    deleteGameById,
    createCart,
    listProducts,
    emptyCart,
    quantityProducts,
    updateProductos,
    updateQuantity
}