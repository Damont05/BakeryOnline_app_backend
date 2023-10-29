//**************************************************************************************/
//      |       Author      |  Desafio  |       descripción         |    Fecha   |
//      |------------------|------------|---------------------------|------------|
//         Luis D. Montero |      3     |  Servidor con ExpressJs   | 27-10-2023
//      |-----------------|------------|---------------------------|------------|
//****************************************************************************************/


//import expressJs
import express from 'express';
import CProductManager from '../class/CProductManager.js';

const app = express();

//instantiated class
const pm =  new CProductManager;

//route get products
app.get('/products', async (req, res) => {
    
    try {
        let products =  await pm.f_getProducts();
        res.setHeader('Content-Type','application/json');

        if(req.query.limit){
            products = products.slice(0, req.query.limit)
        }
        res.status(200).json({ ok:true, filtros: req.query, products });
        
    } catch (error) {
        console.log('Error: ' + error);
    }
});

//route get product for id
app.get('/products/:id', async (req, res) => {

    try {
        let id = req.params.id;
        const product =  await pm.f_getProductById(id);
        res.setHeader('Content-Type','application/json');
        
        if(product == undefined){
            res.status(404).json({ ok:false, error: 'ID Product not found'});
        }
        res.status(200).json({ ok:true, product });
        
    } catch (error) {
        console.log('Error: ' + error);
    }
});

export default app;