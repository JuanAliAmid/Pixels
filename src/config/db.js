import { connect } from 'mongoose';
import { envs } from './envs.js';

const conectarDB = async () => {
    try {
        await connect(envs.mongodb_uri);
        console.log('Conexion ok');

    } catch (error) {
        console.error('Error al conectar', error.message);
    }
}
export default conectarDB;