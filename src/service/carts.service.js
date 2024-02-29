import { CartManagerDB as DAO}  from '../dao/manager/CartsManagerDB.js';
import { logger } from "../utils/loggers.js";
const cm = new DAO;

class CartsService {

    async getCarts(){
        return await cm.f_getCart();
    }

    async getCartById(id){

        try {
            return await cm.f_getCartById(id);
            
        } catch (error) {
            logger.error(error);
            throw new Error("Error al obtener el carrito");
        }
    }

    // async createCart(){
    //     return await cm.f_addCart();
    // }

    async createProdCart(cartId, productId, productQuantity){
        return await cm.addProductToCart(cartId,productId,productQuantity);
    }

}
export const cartsService = new CartsService(DAO);