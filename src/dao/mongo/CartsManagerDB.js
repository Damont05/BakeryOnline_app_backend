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
            const result = await cartModel.find({})
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
    async addProductToCart(cartId, productId, productQuantity) { 
        if(!productId || !cartId){
			throw new Error('Missing required arguments.')
		}
		
		const formattedProductId = productId.trim()
		const formattedCartId = cartId.trim()
		
		if(!formattedProductId || !formattedCartId){
			throw new Error('Missing required arguments.')
		}

		try{
			const currentCart = await cartModel.findById(formattedCartId)
			
			if(!currentCart){
				throw new Error('Cart does not exist.')
			}
			const indexProduct = currentCart.products.findIndex((item) => item.product._id == formattedProductId)
				
			if(indexProduct < 0){
				const quantity = productQuantity || 1
				const newProduct = {
					product: formattedProductId,
					quantity: quantity
				}
				currentCart.products.push(newProduct)
				await currentCart.save()
				return currentCart
			} else {
				const quantity = productQuantity || 1
				const currentProduct = currentCart.products[indexProduct]
				currentProduct.quantity += quantity
				await currentCart.save()
				return currentCart
			}
		}catch(error){
			if( error == 'Missing required arguments.'){
				throw error
			} else {
				throw new Error(error)
			}
		}
    }
} //end class CCartsManager
