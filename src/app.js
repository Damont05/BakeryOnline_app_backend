//**************************************************************************************/
//      |       Author      |  Desafio  |       descripción         |    Fecha   |
//      |------------------|------------|---------------------------|------------|
//         Luis D. Montero |      3     |  Servidor con ExpressJs   | 27-10-2023
//      |-----------------|------------|---------------------------|------------|
//****************************************************************************************/


//import expressJs
import express from 'express';
import routeProducts from './routes/rProducts.js'

const app = express();

//main route products
app.use('/', routeProducts);

//port
let port = process.env.PORT || 8080;

//server on port
const server =  app.listen(port, () =>{
    console.log(`Server on port ${port}`);
});



