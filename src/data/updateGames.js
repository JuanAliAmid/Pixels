import gameModel from "../models/game.model.js";
import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/pixels', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function upDateGame() {
    try {
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a4d" },
            { $set: { precio: 15000 } }
        );
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a4e" },
            { $set: { precio: 21000 } }
        );
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a4f" },
            { $set: { precio: 28000 } }
        );
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a50" },
            { $set: { precio: 17000 } }
        );
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a51" },
            { $set: { precio: 13000 } }
        );
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a52" },
            { $set: { precio: 10000 } }
        );
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a53" },
            { $set: { precio: 0 } }
        );
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a54" },
            { $set: { precio: 26000 } }
        );
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a55" },
            { $set: { precio: 11000 } }
        );
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a56" },
            { $set: { precio: 16500 } }
        );
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a57" },
            { $set: { precio: 20500 } }
        );
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a58" },
            { $set: { precio: 18600 } }
        );
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a59" },
            { $set: { precio: 8500 } }
        );
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a5a" },
            { $set: { precio: 6500 } }
        );
        await gameModel.updateOne(
            { _id: "6a32e35302cb7f7cd4847a5b" },
            { $set: { precio: 16800 } }
        );
    } catch (error) {
        console.error('Error al modificar el campo', errror)
    }
}
upDateGame()