import gameModel from "../models/game.model.js";
import mongoose from "mongoose";
import { envs } from "../config/envs.js";
 
mongoose.connect(envs.mongodb_uri);
 
const updates = [
    { title: "Mortal Kombat", code: 1992, status: true, stock: 10, thumbnails: ["/Mortal-Kombat.jpg"] },
    { title: "Shadow of the Colossus", code: 2005, status: true, stock: 8, thumbnails: ["/Shadow-of-the-Colossus.jpg"] },
    { title: "Elden Ring", code: 2022, status: true, stock: 5, thumbnails: ["/Elden-Ring.jpg"] },
    { title: "Need for Speed Unbound", code: 20221, status: true, stock: 6, thumbnails: ["/Need-for-Speed-Unbound.jpg"] },
    { title: "Mortal Kombat X", code: 2015, status: true, stock: 10, thumbnails: ["/Mortal-Kombat-X.jpg"] },
    { title: "Sonic the Hedgehog", code: 1991, status: true, stock: 15, thumbnails: ["/Sonic-the-Hedgehog.jpg"] },
    { title: "Fortnite", code: 2017, status: true, stock: 999, thumbnails: ["/Fortnite.jpg"] },
    { title: "Call of Duty: Warzone Caldera", code: 2020, status: false, stock: 0, thumbnails: ["/Call-of-Duty-Warzone-Caldera.jpg"] },
    { title: "The Witcher", code: 2007, status: true, stock: 7, thumbnails: ["/The-Witcher.jpg"] },
    { title: "Grand Theft Auto V", code: 2013, status: true, stock: 4, thumbnails: ["/Grand-Theft-Auto-V.jpg"] },
    { title: "Counter-Strike 2", code: 2023, status: true, stock: 999, thumbnails: ["/Counter-Strike-2.jpg"] },
    { title: "The Last of Us", code: 20132, status: true, stock: 6, thumbnails: ["/The-Last-of-Us.jpg"] },
    { title: "God of War", code: 20051, status: true, stock: 5, thumbnails: ["/God-of-War.jpg"] },
    { title: "Mario Kart: Super Circuit", code: 2001, status: true, stock: 12, thumbnails: ["/Mario-Kart-Super-Circuit.jpg"] },
    { title: "Cuphead", code: 20171, status: true, stock: 9, thumbnails: ["/Cuphead.jpg"] },
];
 
async function updateGames() {
    try {
        for (const item of updates) {
            const { title, ...campos } = item;
            const resultado = await gameModel.updateOne(
                { title },
                { $set: campos }
            );
            console.log(`${title}: matched ${resultado.matchedCount}, modified ${resultado.modifiedCount}`);
        }
        console.log("Listo, actualización terminada");
    } catch (error) {
        console.error("Error al actualizar", error);
    } finally {
        mongoose.disconnect();
    }
}
 
updateGames();