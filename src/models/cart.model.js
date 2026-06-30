import { model, Schema } from 'mongoose';

const cartSchema = new Schema({
    productos: [{
        img: {
            type: String,
            required: [true, "La imagen es obligatoria"],
            trim: true,
            unique: true
        },
        nombre: {
            type: String,
            required: [true, "El nombre es obligatorio"],
            trim: true,
        },
        precio: {
            type: Number,
            trim: true,
        }
    }]
});

export default model('cart', cartSchema);