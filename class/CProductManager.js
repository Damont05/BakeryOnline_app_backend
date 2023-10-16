//**************************************************************************************/
//      |       Author      |  Desafio  |       descripción         |    Fecha   |
//      |------------------|------------|---------------------------|------------|
//      |  Luis D. Montero |      1     |  Clases con ECMAScript y  | 14-10-2023
//                                        ECMAScript avanzado             
//      |-----------------|------------|---------------------------|------------|
//
//****************************************************************************************/

class CProductManager {

    constructor(){
        this._products = [];
    }

    //Agregar productos al arreglo _products
    addProduct(code,title,description,price,thumbnail,stock){

        try {

            //validar que todos los campos sean obligatorios para agregar un producto.
            if(!code||!title||!description||!price||!thumbnail||!stock){
                console.log("******************************************");
                throw new Error("Faltan parametros, todos los campos son obligatorios");
            }

            //incrementador de id al crear un producto
            let id = 1;
            if(this._products.length>0){
                id = this._products[this._products.length-1].id + 1
            }

            let newProduct = {
                id,
                code,
                title,
                description,
                price,
                thumbnail,
                stock
            }

            let indice=this._products.findIndex(prod=>prod.code===code)
            if(indice===-1){
                this._products.push(newProduct);
                return
            }
            console.log (`\n******************************** \n ERROR: No se puede agregar producto, codigo de producto: '${code}' duplicado.`)
            
        } catch (e) {
            console.log("ERROR: F_addProduct: " +  e);
        }
        
    }

    //Obtener productos
    getProducts(){return this._products;}

    //Obtener productos por Id
    getProductById(id){

        try {
            let indice = this._products.findIndex(prod => prod.id === id)
            //indice -1 cuando no lo encuentra en el arrays
            if (indice === -1){
                console.log(`ERROR: Not found`);
                return
            }
            //en caso contrario retorna el producto en la posicion pasada por parametro
            return this._products[indice];

        } catch (e) {
            console.log("ERROR: F_getProductById: " +  e);
        }
    }
} //end class CProductManager

/*
//********PROCESO DE TESTING*********
//Se creará una instancia de la clase “ProductManager”
let pm = new CProductManager();
//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log("******************************************");
console.log(pm.getProducts());
//Se llamará al método “addProduct” con los campos:
console.log("******************************************");
pm.addProduct("abc123","producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25);
//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(pm.getProducts());
//Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
console.log("******************************************");
pm.addProduct("abc123","producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25);
console.log("******************************************");
//Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo.
console.log(pm.getProductById(2));
console.log("******************************************");
*/

//**********PROCESO FINAL*********
let pm = new CProductManager();
//add products
pm.addProduct("PB003","Croissant de Jamon de Campo", "con queso mozzarella", 45, "./assets/img", 3);
pm.addProduct("PB001","Tartaleta Nuez Caluga", "100gr", 122, "./assets/img", 1);
pm.addProduct("PB002","Medialuna", "80gr", 40, "./assets/img", 3);
//get all products
console.log("******************************************");
console.log(pm.getProducts());
console.log("******************************************");
//get product by id
console.log(pm.getProductById(3));
console.log()
console.log("******************************************");
