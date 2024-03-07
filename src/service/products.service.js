import { productMongoDAO } from "../dao/productsMongoDao.js";
import { productsModel } from "../dao/models/products.model.js";
import { logger } from "../utils/loggers.js";

export class ProductManager {

  async listProducts(pag, limit, sortOrder, category) {

    if (limit === null) {
        limit = 10;
    }
    try {
      logger.info(category)
      const query = category ? { category: category } : {};
      return productMongoDAO.getPaginate(query,limit,pag,sortOrder)
    } catch (e) {
      logger.error(e)
      return null;
    }
  }

  async listProductsId(idprod) {
    try {
      return await productsModel.findOne({ id: idprod }).lean();
    } catch (e) {
      logger.error(e)
      return null;
    }
  }

  async addProduct(productData) {
    try { 
      const lastProduct = await productMongoDAO.get()
      
      logger.info(lastProduct)
      const lastProductId = lastProduct ? lastProduct.id : 0;
      const newProductId = lastProductId + 1;

      const productWithId = { ...productData, id: newProductId };

      return await productMongoDAO.create(productWithId)
    } catch (e) {
      logger.error(e)
    } 
  }

  async updateProductById(id, updatedFields) {
    try {
      const result = await productMongoDAO.update(id,updatedFields)

      if (result.modifiedCount !== undefined) {
        if (result.modifiedCount > 0) {
          return true;
        } else {
          return false;
        }
      }
    } catch (e) {
      logger.error(e)
      throw new Error("Error updateProductById");
    }
  }

  async deleteProductById(id) {
    try {
      const result = await productMongoDAO.delete(id)

      if (result.deletedCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      logger.error(e)
      throw new Error("Error deleteProductById");
    }
  }

  async  updateProductQuantities(cart) {
    try {
      let noStock=[]
      let productsStock=[]
      for (const product of cart.products) {
          const productId = product.product.id;
          const quantity = product.quantity;

          // Get the existing product from the database
          const existingProduct = await productMongoDAO.getProduct({ id: productId });
          
          if (existingProduct) {
              // Subtract the quantity from the existing stock
              let updatedStock = existingProduct.stock - quantity;
              //si no hay stock agregamos producto a nostock
              if (updatedStock<0){
                noStock.push(product)
                updatedStock = existingProduct.stock
                logger.info(noStock)
              }else{
                productsStock.push(product)
              }
              // Update the stock in the database
              const updated = await productMongoDAO.update(productId, { stock: updatedStock });
              
              if (!updated) {
                logger.info(`Product with ID ${productId} not found or not updated.`);
              }
              
          } else {
            logger.info(`Product with ID ${productId} not found in the database.`);
          }
      }
      return { noStock: noStock, productsStock: productsStock }
    } catch (e) {
        logger.error("Error updating product quantities:", e);
    }
  }
}


