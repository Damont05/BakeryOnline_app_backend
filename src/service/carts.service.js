import { CartManagerDB as DAO}  from '../dao/manager/CartsManagerDB.js';
const cm = new DAO;

class CartsService {

    async getCarts(){
        return await cm.f_getCart();
    }

    async getCartById(id){
        return await cm.f_getCartById(id);
    }

    async createCart(){
        return await cm.f_addCart();
    }

    async createProdCart(cartId, productId, productQuantity){
        return await cm.addProductToCart(cartId,productId,productQuantity);
    }

}
export const cartsService = new CartsService(DAO);