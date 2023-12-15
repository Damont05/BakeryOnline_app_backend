//************************************************************************/
//      |       Author     |       descripción         |    Fecha   |
//      |------------------|---------------------------|------------|
//         Luis D. Montero |  Servidor con ExpressJs   | 27-10-2023
//      |----------------- |---------------------------|------------|
//        Luis D. Montero  |  Primera entrega          | 05-11-2023
//      |----------------- |---------------------------|------------|
//   
//**********************************************************************/


//import expressJs
import express from 'express';
// import CProductManager from '../class/ProductManager.class.js';
//import {io} from '../app.js';

import { productsModel } from '../dao/models/products.model.js';
import {ProductManagerDB} from '../dao/mongo/ProductManagerDB.js'
import mongoose from 'mongoose';

const router = express.Router();


//instantiated class DB Cart
const pm =  new ProductManagerDB;

//******************************************/
//route get products (path : /api/products)
//******************************************/
router.get('/', async (req, res) => {
    try {
        let products =  await pm.f_getProducts();
        res.setHeader('Content-Type','application/json');

        if(req.query.limit){
            products = products.slice(0, req.query.limit)
        }
        return res.status(200).json({ ok:true, filtros: req.query, products });
        
    } catch (error) {
        console.log('Error: GET: ' + error);
    }
});

//***********************************************/
//route get product for id (api/products/:pid)
//***********************************************/
router.get('/:pid', async (req, res) => {

    try {
        let { pid }  = req.params;
       
        if(!mongoose.Types.ObjectId.isValid(pid)){
            res.setHeader('Content-Type','application/json');
            return  res.status(400).json({ ok:false, error: 'ID Product is not valid'});
        }
        const product =  await pm.f_getProductById(pid);
       
        if(product == undefined){
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({ ok:false, error: 'ID Product not found'});
        }
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({ ok:true, product });
  
    } catch (error) {
        console.log('Error: GET:ID: ' + error);
    }
});

//*************************************/
//route add product (api/products/)
//*************************************/
router.post('/', async (req, res) =>{
    try {

        let {code, title, description, price, status, stock, category, thumbnail} = req.body;

        if(!code||!title||!description||!price||!status||!stock||!category){
            res .setHeader('Content-Type', 'application/json');
            return res.status(400).json({ ok:false, error: `fields are required` })
        }
        
        console.log('code: ',code);
        let products =  await pm.f_getProducts();
        //console.log('products: ',products);
        //console.log('products: ',typeof(products));
        let encontrado;
        for(let k in products) {
            if(products[k].code == code){
                console.log('existe');
                encontrado = true;
            }
        }
        if (encontrado){
             res.setHeader('Content-Type', 'application/json');
             return res.status(400).json({ ok:false, error: `El codigo de producto ' ${code} ' ya existe en BD` })
        }

        let newProduct =  {code, title, description, price, status, stock, category, thumbnail}
        await pm.f_addProduct(newProduct);
        //io.emit("newProduct",newProduct)

        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ ok:true, message:'Product created' , newProduct });
        
    } catch (error) {
        console.log('Error: POST: ' + error);
    }
});

//*****************************************/
//route update product (api/products/:pid)
//*****************************************/

router.put('/:id', async (req, res) =>{
    try {
        
        let {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            res.setHeader('Content-Type','application/json');
            return  res.status(400).json({ ok:false, error: 'ID Product is not valid'});
        }
        let existe
        try {
            existe=await productsModel.findOne({_id:id}) 
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error server - try again later`, detalle: error.message})
        }

        if(!existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`ID Product: ${id} not found`})
        }

        if(req.body._id || req.body.code){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({ok:false, error:`Cannot modify properties "_id" and "code"`})
        }

        let result
        try {
            result=await productsModel.updateOne({_id:id},req.body)
            if(result.modifiedCount >0){
                res.setHeader('Content-Type','application/json');
                return res.status(200).json({ok:true, payload:"Modified product"});
            }else{
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({ok:false, error:`Modification error`})
            }
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error server - try again later`, detalle: error.message})
    
        }
    } catch (error) {
        console.log('Error: PUT: ' + error);         
    }
});

//*****************************************/
//route deleted product (api/products/:pid)
//*****************************************/
router.delete('/:pid', async (req, res) =>{
    try {

        let {pid} = req.params;

        if(!mongoose.Types.ObjectId.isValid(pid)){
            res.setHeader('Content-Type','application/json');
            return  res.status(400).json({ ok:false, error: 'ID Product is not valid'});
        }
        let existe
        try {
            existe=await productsModel.findOne({_id:pid}) 
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error server - try again later`, detalle: error.message})
        }

        if(!existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`ID Product: ${pid} not found`})
        }

        let result
        try {
            result=await productsModel.deleteOne({_id:pid},req.body)
            console.log(result);
            if(result.deletedCount>0){
                res.setHeader('Content-Type','application/json');
                return res.status(200).json({ok:true, payload:"Deleted product"});
            }else{
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({ok:false, error:`Deleted error`})
            }
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error server - try again later`, detalle: error.message})
    
        }
    } catch (error) {
        console.log('Error: DELETE: ' + error);   
    }
});

export default router;