import { model, Schema } from 'mongoose';

const recommendationSchema = new Schema({
    title: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
        unique: true,
    },
    category: {
        type: String,
        required: [true, "La categoria es obligatoria"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    }
});

export default model('Recomendacion', recommendationSchema);