import { model, Schema } from 'mongoose';

const gameSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
        unique: true,
    },
    anio: {
        type: Number,
        required: [true, "Año es obligatorio"],
        trim: true,
        minlength: [4],
    },
    categoria: {
        type: String,
        required: [true, "La categoria es obligatoria"],
        trim: true,
    },
    precio: {
        type: Number,
        trim: true,
    }
});

export default model('Game', gameSchema);