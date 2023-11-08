//**************************************************************************************/
//      |       Author      |  Desafio  |       descripción         |    Fecha   |
//      |------------------|------------|---------------------------|------------|
//        Luis D. Montero  |      4     |  Primera entrega          | 05-11-2023
//      |-----------------|------------|---------------------------|------------|
//****************************************************************************************/

//import expressJs
import express from 'express';
import CCartsManager from '../class/CartsManager.class.js';

const router = express.Router();

//instantiated class Cart
const cm =  new CCartsManager;

//******************************************/
//route get cart (api/carts/)
//******************************************/
router.get('/', async (req, res) => {
    
    try {
        let carts =  await cm.f_getCart();
        res.setHeader('Content-Type','application/json');

        if(req.query.limit){
            carts = carts.slice(0, req.query.limit)
        }
        return res.status(200).json({ ok:true, filtros: req.query, carts });
        
    } catch (error) {
        console.log('Error: GET(cart) ' + error);
    }
});

//***********************************************/
//route get cart for id (api/cart/:pid)
//***********************************************/
router.get('/:cid', async (req, res) => {

    try {
        let { cid }  = req.params;
        cid=parseInt(cid)
        if(isNaN(cid)){
            res.setHeader('Content-Type','application/json');
            return  res.status(400).json({ ok:false, error: 'ID Cart is not numeric'});
        }
        const cart =  await cm.f_getCartById(cid);
       
        if(cart == undefined){
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({ ok:false, error: 'ID Cart not found'});
        }
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({ ok:true, cart });
        
    } catch (error) {
        console.log('Error: GET:ID(cart) ' + error);
    }
});


//*************************************/
//route add Cart (api/carts/)
//*************************************/
router.post('/', async (req, res) =>{
    try {
        const carts = await cm.f_getCart();
        let id = 1
        if (carts.length > 0) {
            id = carts[carts.length - 1].id_c + 1
        }
        const newCart = await cm.f_addCart(id);
        if(newCart){
            res.setHeader('Content-Type', 'application/json');
            return res.status(201).json({ok:'true', message: "Cart created successfully", newCart})
        }else{
            return res.status(400).json({ok:'false', error: "The cart couldn't be created"});
        }
    } catch (error) {
        console.log('Error: POST: ' + error);
    }
});

//*****************************************************/
//route add Product Cart (api/carts/:cid/product/:pid)
//*****************************************************/
router.post('/:cid/product/:pid', (req, res) => {
    let productId = req.params.pid;
    let id = req.params.cid
    id = parseInt(id)
    if (isNaN(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ok:'false', error: "ID Cart is not valid"});
    }
    productId = parseInt(productId)
    if (isNaN(productId)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ok:'false', error: "ID Product is not valid"});
    }
    if (cm.addProductToCart(id, productId)) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ ok:true, message: 'Product added to cart successfully'});
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).json({ ok:false, error: 'Cart not found' });
    }
});


export default router;