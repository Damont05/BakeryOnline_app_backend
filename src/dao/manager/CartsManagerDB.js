//***************************************************************************/
//      |       Author     |      description          |    Date    |
//      |------------------|---------------------------|------------|
//        Luis D. Montero  |  Primera entrega          | 05-11-2023
//      |----------------- |---------------------------|------------|
//**************************************************************************/

//Required
import { cartModel } from '../models/carts.model.js';
import mongoose from 'mongoose';


export class CartManagerDB{

    constructor()
    {   
        this.lista = [];
    }

    //Add products cart
    async f_addCart(){

        try { 
            const newCart = await cartModel.create({ products: [] });
            return newCart;

        } catch (error) {
            console.log('ERROR: f_addCart- ' + error);
        }              
    }      

    //Get products cart
    async f_getCart(){
        try {
            const result = await cartModel.find({});
            return result;
        } catch (error) {
            console.log('ERROR: f_getCart - ' + error);
        }
    }
    
    //Get cart for Id
    async f_getCartById(id_c){

        try {
            const carts = await cartModel.findById(id_c);
            if(carts){
                 return carts;
            }else{
                throw new Error();
            }
        } catch (error) {
            console.log('ERROR: f_getCartById - ' + error);
        }
    }

    // Adds a product to a cart, If the product is already in the cart, increase its quantity
    async addProductToCart(idCart, idProduct) { 
        try {
            const carts = JSON.parse(await fs.promises.readFile(this.path,"utf-8"));
            const cart = carts.find(c => c.id_c === idCart);
            !cart ?  false : true;

            const existingProductIndex = cart.products.findIndex(p => p.id_p === idProduct);

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity = (cart.products[existingProductIndex].quantity || 0) + 1;
            } else {
                cart.products.push({ id_p: idProduct, quantity: 1 });
            }
            const cartIndex = carts.findIndex(c => c.id_c === idCart);
            carts[cartIndex] = cart;
            
            await fs.promises.writeFile(this.path, JSON.stringify(carts,null,5))
        
            return true;
                
        } catch (error) {
          console.log(error.message);
          throw new Error("Error updating the cart");
        }
    }
} //end class CCartsManager
