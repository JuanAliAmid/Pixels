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
import { createServer } from 'http';
import { Server } from 'socket.io';
import recommendationRouter from "./routes/api/recommendation.routes.js";

const app = express(); // crea la aplicaciopn express

const serverHttp = createServer(app);
const io = new Server(serverHttp);
app.set('io', io);

io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use(async (req, res, next) => {
    try {
        const games = await cartModel.find().lean();
        res.locals.total = games[0]?.productos?.length || 0;
        res.locals.cid = games[0]?._id;
    } catch (error) {
        res.locals.total = 0;
        res.locals.cid = null;
    }
    next()
});

app.engine('handlebars', engine({
    helpers: {
        ifEquals: function (a, b, options) {
            if (a === b) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
}));

app.set('view engine', 'handlebars');

app.set('views', 'src/views')

app.use(express.json()); // Permite recibir datos en formato JSON en el body

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true })); // Permite recibir datos de formularios HTML en el body

conectarDB();

// routes api
app.use('/api/products', gameRoutes); //base de datos

app.use('/api/recommendation', recommendationRouter); 

app.use('/api/carts', cartRouter);

// routes views
app.use('/', viewRouter); //VISTA: home

app.use('/products', viewUserRouter); //VISTAS: lista y detalles

const PORT = envs.port;
serverHttp.listen(PORT, () => { console.log(`Server corriendo en http://localhost:${PORT}`); });