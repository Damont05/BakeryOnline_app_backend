//***************************************************************************/
//      |       Author     |      description          |    Date    |
//      |------------------|---------------------------|------------|
//        Luis D. Montero  |  Primera entrega          | 05-11-2023
//      |----------------- |---------------------------|------------|
//**************************************************************************/

//import expressJs
import express from 'express';
//import model db
import { CartManagerDB } from '../dao/manager/CartsManagerDB.js';
import mongoose from 'mongoose';

const router = express.Router();

//instantiated class DB Cart
const cm =  new CartManagerDB;

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
      
        if(!mongoose.Types.ObjectId.isValid(cid)){
            res.setHeader('Content-Type','application/json');
            return  res.status(400).json({ ok:false, error: 'ID Cart is not valid'});
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
// router.post('/', async (req, res) =>{
//     try {

//         let newCart
//         newCart =  await cartModel.create({})
//         if(newCart){
//             res.setHeader('Content-Type', 'application/json');
//             return res.status(201).json({ok:'true', message: "Cart created successfully", newCart})
//         }else{
//             return res.status(400).json({ok:'false', error: "The cart couldn't be created"});
//         }
//     } catch (error) {
//         console.log('Error: POST: ' + error);
//     }
// });
router.post('/', async (req, res) =>{
    try {
        const newCart = await cm.f_addCart();
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
// router.post('/:cid/product/:pid', async (req, res) => {
//     let productId = req.params.pid;
//     let id = req.params.cid

//     // if(!mongoose.Types.ObjectId.isValid(id)){
//     //     res.setHeader('Content-Type','application/json');
//     //     return  res.status(400).json({ ok:false, error: 'ID Cart is not valid'});
//     // }

//     // if(!mongoose.Types.ObjectId.isValid(productId)){
//     //     res.setHeader('Content-Type','application/json');
//     //     return  res.status(400).json({ ok:false, error: "ID Product is not valid"});
//     // }

//     // const carts = JSON.parse(await fs.promises.readFile(this.path,"utf-8"));
//     // const cart = carts.find(c => c.id_c === idCart);
//     // !cart ?  false : true;

//     let existeCart
//     try {
//         existeCart=await cartModel.findOne({_id:id}) 
//         console.log("EXISTE: " , existeCart)
//     } catch (error) {
//         res.setHeader('Content-Type','application/json');
//         return res.status(500).json({error:`Error server - try again later`, detalle: error.message})
//     }

//     const existingProductIndex = existeCart.products.findIndex(p => p.id_p === productId);
//     console.log('existingProductIndex: ', existingProductIndex);

//     if (existingProductIndex !== -1) {
//         existeCart.products[existingProductIndex].quantity = (existeCart.products[existingProductIndex].quantity || 0) + 1;
//     } else {
//         existeCart.products.push({ id_p: productId, quantity: 1 });
//     }
//     let newCart
//     newCart =  await cartModel.create({existeCart})

// });

router.post('/:cid/product/:pid', (req, res) => {
    let productId = req.params.pid;
    let id = req.params.cid
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.setHeader('Content-Type','application/json');
        return  res.status(400).json({ ok:false, error: 'ID Cart is not valid'});
    }
    if(!mongoose.Types.ObjectId.isValid(productId)){
        res.setHeader('Content-Type','application/json');
        return  res.status(400).json({ ok:false, error: 'ID Product is not valid'});
    }

    if (cm.addProductToCart()) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ ok:true, message: 'Product added to cart successfully'});
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).json({ ok:false, error: 'Cart not found' });
    }
});


export default router;