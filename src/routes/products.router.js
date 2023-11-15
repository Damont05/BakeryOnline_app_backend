//************************************************************************/
//      |       Author     |       descripción         |    Fecha   |
//      |------------------|---------------------------|------------|
//         Luis D. Montero |  Servidor con ExpressJs   | 27-10-2023
//      |----------------- |---------------------------|------------|
//        Luis D. Montero  |  Primera entrega          | 05-11-2023
//      |----------------- |---------------------------|------------|
//   
//**********************************************************************/


//import expressJs
import express from 'express';
import CProductManager from '../class/ProductManager.class.js';
import {io} from '../app.js';

const router = express.Router();

//instantiated class
const pm =  new CProductManager;

//******************************************/
//route get products (path : /api/products)
//******************************************/
router.get('/', async (req, res) => {
    
    try {
        let products =  await pm.f_getProducts();
        res.setHeader('Content-Type','application/json');

        if(req.query.limit){
            products = products.slice(0, req.query.limit)
        }
        return res.status(200).json({ ok:true, filtros: req.query, products });
        
    } catch (error) {
        console.log('Error: GET: ' + error);
    }
});

//***********************************************/
//route get product for id (api/products/:pid)
//***********************************************/
router.get('/:pid', async (req, res) => {

    try {
        let { pid }  = req.params;
        pid=parseInt(pid)
        if(isNaN(pid)){
            res.setHeader('Content-Type','application/json');
            return  res.status(400).json({ ok:false, error: 'ID Product is not numeric'});
        }
        const product =  await pm.f_getProductById(pid);
       
        if(product == undefined){
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({ ok:false, error: 'ID Product not found'});
        }
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({ ok:true, product });
        
    } catch (error) {
        console.log('Error: GET:ID: ' + error);
    }
});

//*************************************/
//route add product (api/products/)
//*************************************/
router.post('/', async (req, res) =>{
    try {

        let {code, title, description, price, status, stock, category, thumbnail} = req.body;

        if(!code||!title||!description||!price||!status||!stock||!category){
            res .setHeader('Content-Type', 'application/json');
            return res.status(400).json({ ok:false, error: `fields are required` })
        }

        let products =  await pm.f_getProducts();

        let existe = products.find(prod => prod.code === code)
        if (existe) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ ok:false, error: `El codigo de producto ' ${code} ' ya existe en BD` })
        }

        let id = 1
        if (products.length > 0) {
            id = products[products.length - 1].id + 1
        }
        
        let newProduct =  {id, code, title, description, price, status, stock, category, thumbnail}
        await pm.f_addProduct(newProduct);

        io.emit("newProduct",newProduct)

        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ ok:true, message:'Product created' , newProduct });
   
    } catch (error) {
        console.log('Error: POST: ' + error);
    }
});

//*****************************************/
//route update product (api/products/:pid)
//*****************************************/

router.put('/:id', async (req, res) =>{
    try {
        
        let {id} = req.params;
        id = parseInt(id);
        if(isNaN(id)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({ ok:false, error: 'ID Product is not numeric'});
        }

        let products =  await pm.f_getProducts();

        let index = products.findIndex(p=>p.id ===id)
        if(index === -1){
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({ ok:false, error: `ID Product: ' ${id} ' not found`});
        }
        
        let allowedProperties = ["code", "title", "description", "price", "status", "stock", "category", "thumbnail"]
        let keyEntry = Object.keys(req.body)

        let valido = keyEntry.every(prop => allowedProperties.includes(prop))
        if (!valido) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Other properties are not accepted`, allowedProperties })
        }

        let productEdit = {...products[index], ...req.body}

        products[index] = productEdit;   

        await pm.f_updateProduct(products);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({  ok:true, message:'Modified product', productEdit });
        
    } catch (error) {
        console.log('Error: PUT: ' + error);         
    }
});

//*****************************************/
//route deleted product (api/products/:pid)
//*****************************************/
router.delete('/:pid', async (req, res) =>{
    try {

        let {pid} = req.params;
        pid = parseInt(pid);
        if(isNaN(pid)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({ ok:false, error: 'ID Product is not numeric'});
        }
        let products =  await pm.f_getProducts();

        let index = products.findIndex(p=>p.id ===pid)
        if(index === -1){
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({ ok:false, error: `ID Product: ' ${pid} ' not found`});
        }

        await pm.f_deleteProduct(pid);
        io.emit("deleteProduct",pid )

        res.setHeader('Content-Type','application/json');
        res.status(200).json({  ok:true, message:'Deleted product' });
        
    } catch (error) {
        console.log('Error: DELETE: ' + error);   
    }
});

export default router;