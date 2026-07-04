import cartModel from "../models/cart.model.js";


const quantityProductsDao = async (cid, pid) => { // aumentar cantidad sino tiene crearla
    let newQuantity = await cartModel.findOneAndUpdate(
        { _id: cid, 'productos.product': pid },
        { $inc: { "productos.$.quantity": 1 } },
        { new: true }
    );
    if (!newQuantity) {
        newQuantity = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $push: { productos: { product: pid, quantity: 1 } } },
            { new: true }
        );
    }
    return newQuantity
}

const listProductsDao = async (cid) => { //lista los juegos
    const gameFound = await cartModel.findById(cid).populate('productos.product').lean();
    return gameFound
}

const updateProductosDao = async (cid, productos) => { // reemplazar productos
    const replaceProduct = await cartModel.findOneAndUpdate(
        { _id: cid },
        { $set: { productos: productos } },
        { new: true }
    )
    return replaceProduct
}

const updateQuantityDao = async (cid, pid, quantity) => { //Actualizar cantidad
    const newQuantity = await cartModel.findOneAndUpdate(
        { _id: cid, 'productos.product': pid },
        { $set: { 'productos.$.quantity': quantity } },
        { new: true }
    )
    return newQuantity
}

const emptyCartDao = async (cid) => { //vaciar carrito
    const empty = await cartModel.findByIdAndUpdate(
        cid,
        { $set: { productos: [] } },
        {new: true}
    );
    return empty
}

const createCartDao = async () => { //crear un cart
    const newCart = await cartModel.create({});
    return newCart
}

const deleteGameByIdDao = async (cid, pid) => { //eliminar por id
    const pid2 = await cartModel.findOneAndUpdate(
        { _id: cid },
        { $pull: { productos: { product: pid } } },
        {new: true}
    )
    return pid2
}

export default {
    quantityProductsDao,
    listProductsDao,
    updateProductosDao,
    updateQuantityDao,
    emptyCartDao,
    createCartDao,
    deleteGameByIdDao,
}


