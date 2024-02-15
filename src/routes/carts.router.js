//***************************************************************************/
//      |       Author     |      description          |    Date    |
//      |------------------|---------------------------|------------|
//        Luis D. Montero  |  Primera entrega          | 05-11-2023
//      |----------------- |---------------------------|------------|
//**************************************************************************/

import {Router} from 'express';
import {cartsController} from '../controller/carts.controller.js'
export const router = Router();


//******************************************/
//route get cart (api/carts/)
//******************************************/
router.get('/', cartsController.getCarts);

//***********************************************/
//route get cart for id (api/cart/:pid)
//***********************************************/
router.get('/:cid', cartsController.getCartsById);

//*************************************/
//route add Cart (api/carts/)
//*************************************/
router.post('/', cartsController.createCart);

//*****************************************************/
//route add Product Cart (api/carts/:cid/product/:pid)
//*****************************************************/
router.post('/:cid/product/:pid', cartsController.createProdCart);


