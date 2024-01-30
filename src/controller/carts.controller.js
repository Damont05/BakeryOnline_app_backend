import { CartManagerDB } from '../dao/mongo/CartsManagerDB.js';
import mongoose from 'mongoose';

//instantiated class DB Cart
const cm =  new CartManagerDB;

export class cartsController{

    static async getCarts(req,res){

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

    }

    static async getCartsById(req,res){
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
    }

    static async createCart(req,res){
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
    }

    static async createProdCart(req,res){

        if (!req.params.cid || !req.params.pid || !req.body) {
            throw new Error('Missing required arguments.')
        }
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const productQuantity = req.body.quantity
    
            const data = await cm.addProductToCart(cartId, productId, productQuantity)
    
            res.status(201).send({ status: 'Success', payload: data })
        } catch (error) {
            if(error == 'Missing required arguments.'){
                console.error(error)
                res.status(400).json({ status: 'Error', payload: error }) 
            } else {
                console.error(error)
                res.status(500).json({ status: 'Error', payload: error }) 
            }
        }
    }


}
