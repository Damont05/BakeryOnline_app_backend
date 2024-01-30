//************************************************************************/
//      |       Author     |       descripción         |    Fecha   |
//      |------------------|---------------------------|------------|
//         Luis D. Montero |  Servidor con ExpressJs   | 27-10-2023
//      |----------------- |---------------------------|------------|
//        Luis D. Montero  |  Primera entrega          | 05-11-2023
//      |----------------- |---------------------------|------------|
//   
//**********************************************************************/

import {Router} from 'express';
import {productsController} from '../controller/products.controller.js'
export const router = Router();


//******************************************/
//route get products (path : /api/products)
//******************************************/
router.get('/', productsController.getProducts);

//***********************************************/
//route get product for id (api/products/:pid)
//***********************************************/
router.get('/:pid', productsController.getProductsById);

//*************************************/
//route add product (api/products/)
//*************************************/
router.post('/', productsController.createProduct);

//*****************************************/
//route update product (api/products/:pid)
//*****************************************/
router.put('/:id', productsController.updateProduct);

//*****************************************/
//route deleted product (api/products/:pid)
//*****************************************/
router.delete('/:pid', productsController.deleteProduct);

