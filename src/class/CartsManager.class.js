//**************************************************************************************/
//      |       Author      |  Desafio  |       descripción         |    Fecha   |
//      |------------------|------------|---------------------------|------------|
//        Luis D. Montero  |      4     |  Primera entrega          | 05-11-2023
//      |-----------------|------------|---------------------------|------------|
//****************************************************************************************/

//Required
import fs from 'fs';

import CProductManager from "./ProductManager.class.js";
//instantiated class Products
const pm =  new CProductManager;

export default class CCartsManager{

    constructor()
    {   
       //ruta relativa de archivo
       this.path = "./src/files/cart.json";
    }

    //Add products cart
    async f_addCart(id_c){

        try {
            let carts = await this.f_getCart();

            const newCart = { id_c, products: [] };

            carts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts,null,5))
            return newCart;

        } catch (error) {
            console.log('ERROR: f_addCart- ' + error);
        }              
    }      

    //Get products cart
    async f_getCart(){
        try {
            if(fs.existsSync(this.path)){
                return JSON.parse(await fs.promises.readFile(this.path,"utf-8"))
            }else{
                return [];
            }
        } catch (error) {
            console.log('ERROR: f_getCart - ' + error);
        }
    }
    
    //Get cart for Id
    async f_getCartById(id_c){

        try {
            const carts = await this.f_getCart();
            const cart = carts.find(c=> c.id_c === parseInt(id_c));
            if(cart){
                 return cart;
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


