import { model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const gameSchema = new Schema({
    title: {
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
    category: {
        type: String,
        required: [true, "La categoria es obligatoria"],
        trim: true,
    },
    price: {
        type: Number,
        trim: true,
    },
    code: {
        type: Number,
        trim: true,
    },
    status: {
        type: Boolean,
        trim: true,
    },
    stock: {
        type: Number,
        trim: true,
    },
    thumbnails: {
        type: [String],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "La descripción es obligatoria"],
        trim: true,
    }
});

gameSchema.plugin(mongoosePaginate);
export default model('Game', gameSchema);
