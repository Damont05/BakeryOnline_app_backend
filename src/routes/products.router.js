//************************************************************************/
//      |       Author     |       descripción         |    Fecha   |
//      |------------------|---------------------------|------------|
//         Luis D. Montero |  Servidor con ExpressJs   | 27-10-2023
//      |----------------- |---------------------------|------------|
//        Luis D. Montero  |  Primera entrega          | 05-11-2023
//      |----------------- |---------------------------|------------|
//   
//**********************************************************************/

import express from "express";
import {productsController} from '../controller/products.controller.js'
import { auth,authAdmin,authUser } from "../utils/utils.js";

const router = express.Router();

//router.get("/products",  authUser,productsController.getCart );

router.get("/crudProduct", auth,authAdmin, productsController.crud )

router.get("/products/:pid", auth, productsController.getOneProduct);

router.post("/products", productsController.postProduct);

router.post("/productsAct",productsController.actProduct);

router.post("/delete",authAdmin, productsController.deleteProd);

export default router;