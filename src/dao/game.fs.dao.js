import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { deserialize } from 'v8';
import { writeFile } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rutaArchivo = join(__dirname, '../data/games.json');

const getAllGamesFsDao = async () => { //traer todos los juegos

    const array = await fs.readFile(rutaArchivo, 'utf-8');
    const game = JSON.parse(array);
    return game;
    
}


const lookForByIdFsDao = async (id) => { //buscar

    const array = await fs.readFile(rutaArchivo, 'utf-8');
    const game = JSON.parse(array);
    const encontrado = game.find(a => a.id === id);
    return encontrado;

}


const createGameFsDao = async (data) => { //crear juego
    const array = await fs.readFile(rutaArchivo, 'utf-8');

    const arrayJson = JSON.parse(array)

    const newId = arrayJson.length ? arrayJson[arrayJson.length - 1].id + 1 : 1;

    const newGame = { id: newId, title: data.title, category: data.category, description: data.description, price: data.price, code: data.code, status: data.status, stock: data.stock, thumbnails: data.thumbnails };

    arrayJson.push(newGame);

    const arrayStringify = JSON.stringify(arrayJson);

    await fs.writeFile(rutaArchivo, arrayStringify);

    return newGame;
}


const updateGameByIdFsDao = async (id, data) => { //actualizar juego

    const array = await fs.readFile(rutaArchivo, 'utf-8');

    const arrayJson = JSON.parse(array)

    const encontrado = arrayJson.findIndex(a => a.id === id);

    if (encontrado === -1) {
        return console.error('No existen juegos con ese id');
    }

    const actualizado = arrayJson.map(a => a.id === id ? { ...a, ...data } : a);

    const arrayStringify = JSON.stringify(actualizado);

    await fs.writeFile(rutaArchivo, arrayStringify);

    return actualizado[encontrado];

}


const deleteGameFsDao = async (id) => { //eliminar juego

    const array = await fs.readFile(rutaArchivo, 'utf-8');

    const arrayJson = JSON.parse(array)

    const encontrado = arrayJson.findIndex(a => a.id === id);

    if (encontrado === -1) {
        return console.error('No existen juegos con ese id');
    }

    const eliminado = arrayJson.filter(a => a.id !== id);

    const arrayStringify = JSON.stringify(eliminado);

    await fs.writeFile(rutaArchivo, arrayStringify);

    return 'Juego eliminado exitosamente';

}

export default {
    getAllGamesFsDao,
    lookForByIdFsDao,
    createGameFsDao,
    updateGameByIdFsDao,
    deleteGameFsDao
}