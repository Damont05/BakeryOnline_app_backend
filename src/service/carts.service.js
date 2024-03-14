import { cartMongoDAO as Dao } from "../dao/cartsMongoDao.js";
import { logger } from "../utils/loggers.js";

export class CartManager {
  async createCart(userCar) {
    try {
      logger.info('Creating a new cart for user')
      const existingCarts = await Dao.get();
      const cartId = existingCarts.length;
      logger.info('Id carrito: ' ,cartId)
      const newCart = await Dao.create(cartId, userCar);
      return newCart;
    } catch (error) {
      logger.error(error);
      throw new Error("Error al crear el carrito");
    }
  }

  async create() {
    try {
      return Dao.create();
    } catch (e) {
      logger.error(e);
      throw new Error("Error al crear el carrito");
    }
  }

  

  async getCart(cartId) {
    try {
      return Dao.getCart(cartId);
    } catch (error) {
      logger.error(error);
      throw new Error("Error al obtener el carrito");
    }
  }

  async getCarts() {
    try {
      return Dao.get();
    } catch (error) {
      logger.error(error);
      throw new Error("Error al obtener el carrito");
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      logger.info(cartId, productId);
      Dao.addProduct(cartId, productId);

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error("Error al agregar el producto al carrito");
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      Dao.deleteProduct(cartId, productId);
    } catch (error) {
      logger.error(error);
      throw new Error("Error al eliminar el producto del carrito");
    }
  }
  async updateProductQuantityInCart(cartId, productId, newQuantity) {
    try {
      Dao.updateProduct(cartId, productId, newQuantity);
    } catch (error) {
      logger.error(error);
      throw new Error(
        "Error al actualizar la cantidad del producto en el carrito"
      );
    }
  }

  async updateCartWithNoStockProducts(cartId,noStockProducts) {
    try {
      
      await Dao.updateOne(cartId,noStockProducts)
     
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
      throw error; // Maneja el error según sea necesario
    }
  }
}
