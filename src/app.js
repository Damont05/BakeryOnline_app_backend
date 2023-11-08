//**************************************************************************************/
//      |       Author      |  Desafio  |       descripción         |    Fecha   |
//      |------------------|------------|---------------------------|------------|
//         Luis D. Montero |      3     |  Servidor con ExpressJs   | 27-10-2023
//      |-----------------|------------|---------------------------|------------|
//****************************************************************************************/


//import expressJs
import express from 'express';
import routeProducts from './routes/products.router.js'
import routeCarts from './routes/carts.router.js'

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//main route products
app.use('/api/products/', routeProducts);
//main route carts
app.use('/api/carts/', routeCarts);

//port
let port = process.env.PORT || 8080;

//server on port
const server =  app.listen(port, () =>{
    console.log(`Server on port ${port}`);
});



