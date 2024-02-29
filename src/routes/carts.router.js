//***************************************************************************/
//      |       Author     |      description          |    Date    |
//      |------------------|---------------------------|------------|
//        Luis D. Montero  |  Primera entrega          | 05-11-2023
//      |----------------- |---------------------------|------------|
//        Luis D. Montero  |  Add Middleware 'auth'    | 01-02-2024
//      |----------------- |---------------------------|------------|

//**************************************************************************/

import {Router} from 'express';
import {cartsController} from '../controller/carts.controller.js'
export const router = Router();

//Middleware
const auth=(req, res, next)=>{
    if(!req.session.usuario){
        res.redirect('/')
    }
    next()
}

//******************************************/
//route get cart (api/carts/)
//******************************************/
router.get('/', auth, cartsController.getCarts);

//***********************************************/
//route get cart for id (api/cart/:pid)
//***********************************************/
router.get('/:cid', auth, cartsController.getCartsById);

//*************************************/
//route add Cart (api/carts/)
//*************************************/
router.post('/', auth, cartsController.createCart);

//*****************************************************/
//route add Product Cart (api/carts/:cid/product/:pid)
//*****************************************************/
router.post('/:cid/addproduct/:pid',auth, cartsController.createProdCart);

//*****************************************************/
//route generate ticket (api/carts/:cid/purchase)
//*****************************************************/
router.get("/:cid/purchase", auth, cartsController.generateTicket)

//*****************************************************/
//route update cant product (api/carts/:cid/cantproduct/:pid)
//*****************************************************/
//router.post("/:cid/product/:pid",auth, cartsController.postProductOnCartAct);

//*****************************************************/
//route delete cart (api/carts/:cid/product/:pid)
//*****************************************************/
//router.delete("/:cid/product/:pid",auth, cartsController.deleteCart);

