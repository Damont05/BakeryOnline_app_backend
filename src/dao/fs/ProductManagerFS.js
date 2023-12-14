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
import fs from 'fs';

export default class CProductManager {

    constructor()
    {   
        //ruta relativa de archivo
        this.path = "./src/files/products.json";
    }

    //Add products
    async f_addProduct(product){

        try {
            
            let products = await this.f_getProducts(this.path);
     
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
            products.push(newProduct)
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
} //end class CProductManager

