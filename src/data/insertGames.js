import gameModel from "../models/game.model.js";
import mongoose from "mongoose";
import { envs } from "../config/envs.js";

mongoose.connect(envs.mongodb_uri)

async function insertGames() {
    const gameData = [
        { nombre: 'Mortal Kombat', anio: 1992, categoria: 'Lucha', precio: 15000 },
        { nombre: 'Shadow of the Colossus', anio: 2005, categoria: 'Aventura', precio: 18000 },
        { nombre: 'Elden Ring', anio: 2022, categoria: 'Rol', precio: 35000 },
        { nombre: 'Need for Speed Unbound', anio: 2022, categoria: 'Carreras', precio: 28000 },
        { nombre: 'Mortal Kombat X', anio: 2015, categoria: 'Lucha', precio: 12000 },
        { nombre: 'Sonic the Hedgehog', anio: 1991, categoria: 'Aventura', precio: 8000 },
        { nombre: 'Fortnite', anio: 2017, categoria: 'Batalla campal', precio: 0 },
        { nombre: 'Call of Duty: Warzone Caldera', anio: 2020, categoria: 'Batalla campal', precio: 0 },
        { nombre: 'The Witcher', anio: 2007, categoria: 'Rol', precio: 10000 },
        { nombre: 'Grand Theft Auto V', anio: 2013, categoria: 'Aventura', precio: 9000 },
        { nombre: 'Counter-Strike 2', anio: 2023, categoria: 'Disparos', precio: 0 },
        { nombre: 'The Last of Us', anio: 2013, categoria: 'Aventura', precio: 22000 },
        { nombre: 'God of War', anio: 2005, categoria: 'Aventura', precio: 20000 },
        { nombre: 'Mario Kart: Super Circuit', anio: 2001, categoria: 'Carreras', precio: 11000 },
        { nombre: 'Cuphead', anio: 2017, categoria: 'Disparos', precio: 7000 }
    ]
    try {
        const gamesInserts = await gameModel.insertMany(gameData)
        console.log('juegos insertados correctamente', gamesInserts);
    } catch (error) {
        console.error('Error al insertar', error)
    }
}
insertGames()
