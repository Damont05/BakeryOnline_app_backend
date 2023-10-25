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
const fs = require('fs');
class CProductManager {

    constructor()
    {   
        //ruta relativa de archivo
        this.path = "./data.json";
        //llamado a funcion crear archivo
        this.createfile(this.path);
    }

    //Funcion crear Archivo 
    createfile (file) {
        let products = [];
        const jsonData = JSON.stringify(products, null, 5);
        fs.writeFileSync(file, jsonData);
    }

    //Funcion Agregar productos al arreglo _products
    addProduct(code,title,description,price,thumbnail,stock){

        let valid = true;
        let id;
        let products = this.getProducts(this.path);

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

        //validando existencia del codigo de producto
        products.map((product)=>{
            if (product.code === code){
                flag = false;
                console.log("******************************************");
                console.log("ERROR: 'Code' already in use!");
            }
        })

        if (valid){
            try{
                id = products.slice(-1)[0].id;
            }
            catch(error){
                id = 0;
            }finally{
                id++
            }
        
            products.push({id, code, title, description, price, thumbnail, stock})
            const productsJson = JSON.stringify(products, null, 5);
            fs.writeFileSync(this.path, productsJson);
        }
                
    }      
    
    //Funcion Obtener productos
    getProducts (){
        if(fs.existsSync(this.path)){
            let productsJSON = fs.readFileSync(this.path, 'utf-8');
            let products = JSON.parse(productsJSON);
            return products;
            
        }else{
            console.log("File not found!");
        }
    }

    //Obtener productos por Id
    getProductById(id){
        try {
           const products = this.getProducts(this.path);
           const product = products.filter(e=> e.id === parseInt(id));
           return product;
           
        } catch (e) {
            console.log("ERROR: F_getProductById: " +  e);
        }
    }

    //Actualizar productos
    updateProduct(id, field, value){
        try {
            
            let products = this.getProducts(this.path);
            const indexProduct = products.findIndex(product => product.id === id);
            if(indexProduct !== -1){
                products[indexProduct][field] = value;
                const productsJson = JSON.stringify(products, null, 2);
                fs.writeFileSync(this.path, productsJson);
                console.log("Product updated!");
            }else{
                throw new Error();
            }
        } catch (error) {
            console.error("ERROR: F_updateProduct() - ID Product not found!");
            return;
        }
    }

    //Eliminar prductos 
    deleteProduct (id){

        try {
            
            let products = this.getProducts(this.path);
            const index = products.findIndex(product => product.id === id);
    
            if (index !== -1){
                let newProduct = [...products.slice(0, index), ...products.slice(index + 1)];
                const productsJson = JSON.stringify(newProduct, null, 5);
                fs.writeFileSync(this.path, productsJson);
                console.log("Product removed!");
            }else{
                throw new Error();
            }
        } catch (error) {
            console.error("ERROR: F_deleteProduct() - ID Product not found!");
            return;
        }
    }
} //end class CProductManager

//(code,title,description,price,thumbnail,stock){
//********PROCESO DE TESTING*********
const pm = new CProductManager;
//arrays vacio
console.log(pm.getProducts());
console.log("*****************PRODUCTOS AGREGADOS**********************");
//add productos 
pm.addProduct("abc123","producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25);
pm.addProduct("dfg456","producto prueba 2", "Este es un producto prueba 2", 400, "Sin imagen", 10);
pm.addProduct("hij789","producto prueba 3", "Este es un producto prueba 3", 340, "Sin imagen", 13);
//obtener productos recien agregados
console.log(pm.getProducts());
console.log("*************ACTUALIZAR PRODUCTO*******************");
//Actualiza el  producto por id, parametro y nuevo valor
pm.updateProduct(1, "stock", 11);
console.log(pm.getProducts());
console.log("******************PRODUCTO POR ID***********************");
//obtener producto por id
console.log(pm.getProductById(3));
console.log("*****************ELIMINAR PRODUCT*****************");
pm.deleteProduct(2);
console.log(pm.getProducts());


