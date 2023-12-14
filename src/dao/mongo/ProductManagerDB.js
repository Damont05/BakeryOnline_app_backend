//***************************************************************************/
//      |       Author     |       description         |    Date    |
//      |------------------|---------------------------|------------|
//         Luis D. Montero |  Clases con ECMAScript y  | 14-10-2023
//                            ECMAScript avanzado             
//      |----------------- |---------------------------|------------|
//        Luis D. Montero  |   Manejeo de Archivos     |  25-10-2023
//      |----------------- |---------------------------|------------|
//***************************************************************************/

//Required
import { productsModel } from '../models/products.model.js';
import mongoose from 'mongoose';

export class ProductManagerDB {

    constructor()
    {   
        this.lista = [];
    }

    //Add products
    async f_addProduct(product){

        try {
                 
            let newProduct = {
                id:product.id, 
                code:product.code, 
                title:product.title, 
                description:product.description, 
                price:product.price,
                status:product.status, 
                stock:product.stock,
                category:product.category,
                thumbnail:product.thumbnail
            }

            await productsModel.create(newProduct)
        } catch (error) {
            console.log('ERROR: f_addProduct - ' + error);
        }              
    }      
     
    //Get products
    async f_getProducts (){
        try {
            const result = await productsModel.find({});
            return result;
            
        } catch (error) {
            console.log('ERROR: f_getProducts - ' + error);
        }
    }

    //Get products for Id
    async f_getProductById(id){
        try {
            const products = await productsModel.findById(id);
            if(products){
                  return products;
            }else{
                 throw new Error();
            }
    
        } catch (e) {
            console.log("ERROR: f_getProductById - " +  e);
            return;
        }
    }

    //Update products
    async f_updateProduct(products){
        try {

            await fs.promises.writeFile(this.path, JSON.stringify(products,null,5))
           
        } catch (error) {
            console.error("ERROR: f_updateProduct() - ID Product not found!");
            return;
        }
    }

    //Delete prducts 
    async f_deleteProduct(id){

        try {
            let products = await this.f_getProducts(this.path);
            const index = products.findIndex(product => product.id === id);
    
            if (index !== -1){
                let newProduct = [...products.slice(0, index), ...products.slice(index + 1)];
                await fs.promises.writeFile(this.path, JSON.stringify(newProduct,null,5))
                console.log("Product removed!");

            }else{
                throw new Error();
            }
        } catch (error) {
            console.error("ERROR: f_deleteProduct() - ID Product not found!");
            return;
        }
    }
} //end class ProductManagerDB

