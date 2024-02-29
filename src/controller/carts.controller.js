import { CartManagerDB } from '../dao/manager/CartsManagerDB.js';
import { cartsService } from '../service/carts.service.js';

import mongoose from 'mongoose';

//instantiated class DB Cart
const cm =  new CartManagerDB;

export class cartsController{

    static async getCarts(req,res){

        try {
            let carts =  await cartsService.getCarts();
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
    
            const cart =  await cartsService.getCartById(cid);
           
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
            const newCart = await cartsService.createCart();
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
    
            const data = await cartsService.createProdCart(cartId, productId, productQuantity); 
    
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

    static async generateTicket(req, res) {
        try {
          let carUsuario = req.user.cartID;
          console.log(" generateTicket - carUsuario: " + carUsuario);

          let carrito = await cartsService.getCartById(carUsuario); 
          
          let { noStock, productsStock } =
            await productManager.updateProductQuantities(carrito);
    
          let amount = productsStock.reduce((totalAmount, product) => {
            // Accede al precio del producto desde la propiedad product.price
            const price = product.product.price;
            // Verifica si el precio es un número válido
            if (!isNaN(price)) {
              // Multiplica el precio del producto por su cantidad y lo agrega al monto total
              return totalAmount + price * product.quantity;
            } else {
              // Si el precio no es un número válido, retorna el monto total sin cambios
              return totalAmount;
            }
          }, 0);
    
          const nuevoTicketData = {
            purchase_datetime: new Date(),
            products: productsStock,
            amount: amount,
            purchaser: req.user.email,
          };
          const nuevoTicket = await TicketModel.create(nuevoTicketData);
         
          
          cartManager.updateCartWithNoStockProducts(carUsuario,noStock);
          res.status(200).render('ticket', {
            purchase_datetime: nuevoTicketData.purchase_datetime,
            products: nuevoTicketData.products,
            amount: nuevoTicketData.amount,
            purchaser: nuevoTicketData.purchaser,
            noStock: noStock
        });
        
        
        } catch (error) {
          req.logger.error(error);
          res.status(500).json({ error: "error" });
        }
      }


}
