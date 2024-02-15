import { ProductManagerDB as DAO} from "../dao/manager/ProductManagerDB.js"
const pm =  new DAO;

class ProductService{

    async getProducts(){
        return await pm.f_getProducts();
    }

    async getProductById(id){
        
        return await pm.f_getProductById(id)
    }

    async createProduct(newProduct){
        return await pm.f_addProduct(newProduct);
    }

    async deleteProduct(id){
        return await pm.f_deleteProduct(id)
    }

}

export const productService=new ProductService(DAO)