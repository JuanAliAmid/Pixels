import express from "express";
import { engine } from "express-handlebars";
import multer from "multer";
import viewRouter from "./routes/views.router.js";  
import viewUserRouter from "./routes/view.game.routes.js";
import gameRoutes from './routes/api/game.routes.js';
import conectarDB from "./config/db.js";
import cartRouter from "./routes/api/cart.routes.js";
import cartModel from "./models/cart.model.js";
import { envs } from "./config/envs.js";

const app = express(); // crea la aplicaciopn express
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use(async (req, res, next) => {
    const games = await cartModel.find().lean();
    res.locals.total = games[0].productos.length;
    next()
});

app.set('view engine', 'handlebars');
app.engine('handlebars', engine());
app.set('views', 'src/views')
app.use(express.json()); // Permite recibir datos en formato JSON en el body

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })); // Permite recibir datos de formularios HTML en el body

conectarDB();
// routes api
app.use('/api/games', gameRoutes); //base de datos

app.use('/api/cart', cartRouter); 

// routes views
app.use('/', viewRouter); //VISTA: home

// '/products' abre view-user-routes.js y lo pinta en products.handlebars
app.use('/products', viewUserRouter); //VISTAS: lista y detalles


const PORT = envs.port;
app.listen(PORT, () => console.log(`Server corriendo en http://localhost:${PORT}`));
