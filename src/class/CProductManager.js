//**************************************************************************************/
//      |       Author      |  Desafio  |       descripción         |    Fecha   |
//      |------------------|------------|---------------------------|------------|
//         Luis D. Montero |      1     |  Clases con ECMAScript y  | 14-10-2023
//                                        ECMAScript avanzado             
//      |-----------------|------------|---------------------------|------------|
//        Luis D. Montero |      2     |   Manejeo de Archivos     |  25-10-2023
//      |-----------------|------------|---------------------------|------------|
//
//****************************************************************************************/

//Required
import { throws } from 'assert';
import fs from 'fs';

export default class CProductManager {

    constructor()
    {   
        //ruta relativa de archivo
        this.path = "./src/files/products.json";
    }

    //Add products
    async f_addProduct(code,title,description,price,thumbnail,stock){

        try {

            try{
                //validar que todos los campos sean obligatorios para agregar un producto.
                if(!code||!title||!description||!price||!thumbnail||!stock){
                    console.log("******************************************");
                    throw new Error();
                }
            }catch (e) {
                console.error("Incomplete product parameters");
                return;
            }

            let products = await this.f_getProducts(this.path);
    
            let id=1
            if(products.length>0){    
                id=products[products.length -1].id +1
                
                let existe=products.find(p=>p.code===code)
                if(existe){
                    console.log(`El producto con codigo ' ${code} ' ya está registrado...!!!`)
                    return;
                }
            }
            products.push({id, code, title, description, price, thumbnail, stock})
            await fs.promises.writeFile(this.path, JSON.stringify(products,null,5))

        } catch (error) {
            console.log('ERROR: f_addProduct - ' + error);
            
        }              
    }      
    
    //Get products
    async f_getProducts (){
        try {
            if(fs.existsSync(this.path)){
                return JSON.parse(await fs.promises.readFile(this.path,"utf-8"))
            }else{
                return [];
            }
            
        } catch (error) {
            console.log('ERROR: f_getProducts - ' + error);
        }
    }

    //Get products for Id
    async f_getProductById(id){
        try {

            const products = await this.f_getProducts(this.path);
            const product = products.find(p=> p.id === parseInt(id));
            if(product){
                 return product;
            }else{
                throw new Error();
            }
           
        } catch (e) {
            console.log("ERROR: f_getProductById - " +  e);
            return;
        }
    }

    //Update products
    async f_updateProduct(id, field, value){
        try {
            
            let products = await this.f_getProducts(this.path);
            const indexProduct = products.findIndex(product => product.id === id);
            if(indexProduct !== -1){
                products[indexProduct][field] = value;
                await fs.promises.writeFile(this.path, JSON.stringify(products,null,5))
                console.log("Product updated!");
            }else{
                throw new Error();
            }
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
} //end class CProductManager