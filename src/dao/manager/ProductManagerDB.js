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
import e from 'express';
import { productsModel } from '../models/products.model.js';
import mongoose from 'mongoose';

export class ProductManagerDB {

    constructor()
    {   
        this.lista = [];
    }

    getProducts = async (limit, page, sort, query) => {
        console.log('DATOOOOS', limit);
		let formatLimit = limit ? parseInt(limit) : 9
		let formatPage = page ? parseInt(page) : 1
		
		let formatQuery 
		const categories = ['Panaderia', 'Individual', 'Compartir']
		if(categories.includes(query)){
			formatQuery = { category: query }
		} else if (query === 'true' || query === 'false'){
			formatQuery = { status: query }
		} else {
			formatQuery = {}
		}
		
		let formatSort 
		if(sort === 'asc'){
			formatSort = '1'
		}else if(sort === 'desc'){
			formatSort = '-1'
		}
		
		try {
			//const products = await productsMongoDAO.get();

			products.prevLink = products.hasPrevPage ? `?page=${products.prevPage}` : ''
			products.nextLink = products.hasNextPage ? `?page=${products.nextPage}` : ''

			if(products.totalPages > 1){
				products.totalPagesArray = []
				
				for (let i = 1; i <= products.totalPages; i++) {
					products.totalPagesArray.push(i)
				}
			} 
			
		// 	products.payload = products.docs
		// 	delete products.docs
			
		// 	// Crear descripcion corta
		// 	for (const product of products.payload) {
		// 		const descrip = product.description
		// 		if (descrip.length > 90) {
		// 			const shorterDescription = descrip.slice(0, 90)
		// 			const formatedShorterDescription = shorterDescription.trim()
		// 			product.shortDescription = formatedShorterDescription
		// 		}
		// 	}			
		// 	return products

		} catch (error) {
			throw new Error(error)
		}
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
            const result =   await productsModel.find().lean();
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

    //Update product
    async f_updateProduct(id,updatedFields){
        try {
            
            return  productsModel.updateOne(
                { id: id },
                { $set: updatedFields });

        } catch (e) {
            console.error("ERROR: f_updateProduct(): " + e);
            return;
        }
    }

    //Delete prducts 
    async f_deleteProduct(id){

        try {
            return productsModel.deleteOne({ id: id });
        } catch (e) {
            console.error("ERROR: f_deleteProduct(): " + e);
            return;
        }
    }
} //end class ProductManagerDB

