//**************************************************************************/
//      |       Author      |       description         |    Date    |
//      |------------------ |---------------------------|------------|
//         Luis D. Montero  |  Servidor con ExpressJs   | 27-10-2023
//      |------------------ |---------------------------|------------|
//**************************************************************************/


//imports
import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
 
import { router as viewsRouter } from './routes/views.router.js'
import routeProducts from './routes/products.router.js'
import routeCarts from './routes/carts.router.js'
import routeUsers from './routes/users.router.js'
import chatRouter from './routes/chat.router.js'


import conn from './database.js';

const app = express();
//Port
let port = process.env.PORT || 8080;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public'))); //static public

//Routes
//route views
app.use('/', viewsRouter);
//main route products
app.use('/api/products/', routeProducts);
//main route products
app.use('/api/users/', routeUsers);
//main route carts
app.use('/api/carts/', routeCarts);
//chat
//app.use('/chat', chatRouter);

//Server
const server =  app.listen(port, () =>{
    console.log(`Server on port ${port}`);
});

//server socket
export const io = new Server(server);
io.on("connection", socket => {
    console.log(`connected client`);
    //Routes
    //route views
    app.use('/', viewsRouter);
    //main route products
    app.use('/api/products/', routeProducts);
    //main route products
    app.use('/api/users/', routeUsers);
    //main route carts
    app.use('/api/carts/', routeCarts);
    //chat
    app.use('/chat', chatRouter(io));
})
