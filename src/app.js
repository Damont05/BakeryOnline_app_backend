//**************************************************************************/
//      |       Author      |       description         |    Date    |
//      |------------------ |---------------------------|------------|
//         Luis D. Montero  |  Servidor con ExpressJs   | 27-10-2023
//      |------------------ |---------------------------|------------|
//**************************************************************************/


//imports
//
import {dirname} from 'path';
//import __dirname  from './utils/utils.js';

import { fileURLToPath } from "url";
import path from "path";
import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io'
import { MessageModel } from "./dao/models/messages.model.js";
import sessions from 'express-session'
import mongoStore from 'connect-mongo'
import { initPassport } from './config/config.passport.js';
import passport from 'passport';
import { config } from './config/config.js';
import { authUser } from "./utils/utils.js";
import { errorHandler } from './middlewares/errorHandler.js';
import { middLogg } from "./utils/loggers.js";
import { logger } from "./utils/loggers.js";
//
//imports Router
//
import routeProducts from './routes/products.router.js';
import routeCarts from './routes/carts.router.js';
import realTimeProducts from "./routes/liveRouter.js";
import { router as viewsRouter } from './routes/views.router.js';
import { router as sessionRouter } from './routes/session.router.js';
import { router as mockingRouter } from "./routes/mocking.router.js";
import { router as loggerTest } from "./routes/loggerTets.router.js";
import { router as recovery } from "./routes/recovery.router.js";
import { router as routeUsers } from './routes/users.router.js';
import chatRouter from './routes/chat.router.js';
//

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Port
const PORT = 8080;

//mid session
app.use(sessions(
    {
        secret:config.SECRETKEY,
        resave: true, saveUninitialized: true,
        store: mongoStore.create(
            {
                mongoUrl:config.MONGO_URL,
                mongoOptions:{dbName:config.DBNAME},
                ttl:3600
            }
        )
    }
));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public'))); //static public

//Passport config
initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(middLogg)
app.get("/chat",authUser, (req, res) => {
  res.status(200).render("chat");
});

//Main Routes
//
//main route carts
app.use('/api/cart', routeCarts);
//main route views
app.use('/', viewsRouter);
//main route sessions
app.use('/api/sessions', sessionRouter);
//main route mocking
app.use('/mockingProducts', mockingRouter);

app.use('/loggerTest',loggerTest);
app.use('/api/recovery', recovery);
//main route products
app.use('/api', routeProducts);
//main route users
app.use('/api/users', routeUsers);

app.use(
"/live",
(req, res, next) => {
    req.io = io;
    next();
},
realTimeProducts
);

app.use(errorHandler) 

//Server
const server =  app.listen(PORT, () => {
    logger.info(`Server on port ${PORT}`);
});


const io=new Server(server)

let users=[]
let messages=[]

//server socket
io.on("connection", (socket) => {
    logger.info(`Se ha conectado un cliente con id ${socket.id}`);

    socket.on('id', async(nombre) => {
        users.push({nombre, id:socket.id})
        socket.broadcast.emit('newUser',nombre)
    
        try {
            const mensajes = await MessageModel.find({}).lean();
            socket.emit("hello", mensajes);
        } catch (error) {
            console.error("Error al obtener mensajes de la base de datos:", error);
        }
    });

    socket.on("mensaje", async (datos) => {
        const nuevoMensaje = new MessageModel({
        messages: [{ user: datos.emisor, message: datos.mensaje }],
        });

        try {
            const mensajeGuardado = await nuevoMensaje.save();
            logger.info("Mensaje guardado en la base de datos:", mensajeGuardado);
            io.emit("nuevoMensaje", datos);
        } catch (error) {
            console.error("Error al guardar el mensaje en la base de datos:", error);
        }
    });

    socket.on("disconnect", () => {
        let user = user.find((u) => u.id === socket.id);
        if (user) {
          io.emit("usuarioDesconectado", user.nombre);
        }
      });
});