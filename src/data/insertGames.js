import gameModel from "../models/game.model.js";
import mongoose from "mongoose";
import { envs } from "../config/envs.js";

mongoose.connect(envs.mongodb_uri)

async function insertGames() {
    const gameData = [
        { title: 'Mortal Kombat', category: 'Lucha', price: 15000, description: 'Juego de lucha lanzado en 1992.' },
        { title: 'Shadow of the Colossus', category: 'Aventura', price: 18000, description: 'Juego de aventura lanzado en 2005.' },
        { title: 'Elden Ring', category: 'Rol', price: 35000, description: 'Juego de rol lanzado en 2022.' },
        { title: 'Need for Speed Unbound', category: 'Carreras', price: 28000, description: 'Juego de carreras lanzado en 2022.' },
        { title: 'Mortal Kombat X', category: 'Lucha', price: 12000, description: 'Juego de lucha lanzado en 2015.' },
        { title: 'Sonic the Hedgehog', category: 'Aventura', price: 8000, description: 'Juego de aventura lanzado en 1991.' },
        { title: 'Fortnite', category: 'Batalla campal', price: 0, description: 'Juego de batalla campal lanzado en 2017.' },
        { title: 'Call of Duty: Warzone Caldera', category: 'Batalla campal', price: 0, description: 'Juego de batalla campal lanzado en 2020.' },
        { title: 'The Witcher', category: 'Rol', price: 10000, description: 'Juego de rol lanzado en 2007.' },
        { title: 'Grand Theft Auto V', category: 'Aventura', price: 9000, description: 'Juego de aventura lanzado en 2013.' },
        { title: 'Counter-Strike 2', category: 'Disparos', price: 0, description: 'Juego de disparos lanzado en 2023.' },
        { title: 'The Last of Us', category: 'Aventura', price: 22000, description: 'Juego de aventura lanzado en 2013.' },
        { title: 'God of War', category: 'Aventura', price: 20000, description: 'Juego de aventura lanzado en 2005.' },
        { title: 'Mario Kart: Super Circuit', category: 'Carreras', price: 11000, description: 'Juego de carreras lanzado en 2001.' },
        { title: 'Cuphead', category: 'Disparos', price: 7000, description: 'Juego de disparos lanzado en 2017.' }
    ]
    try {
        const gamesInserts = await gameModel.insertMany(gameData)
        console.log('juegos insertados correctamente', gamesInserts);
    } catch (error) {
        console.error('Error al insertar', error)
    }
}
insertGames()
