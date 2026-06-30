import { model, Schema } from 'mongoose';

const cartSchema = new Schema({
    productos: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Game'
        },
        quantity: {
            type: Number
        }
    }]
});

export default model('cart', cartSchema);