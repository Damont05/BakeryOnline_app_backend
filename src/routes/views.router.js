import { Router } from 'express';
import CProductManager from '../class/ProductManager.class.js';
export const router=Router()

//instantiated class
const pm =  new CProductManager;

router.get('/',async (req,res)=>{

    let products =  await pm.f_getProducts();

    res.status(200).render('home', {
        products
    })
})

router.get('/realtimeproducts',async (req,res)=>{

    let products =  await pm.f_getProducts();

    res.status(200).render('realTimeProducts', {
        products
    })
   
})

