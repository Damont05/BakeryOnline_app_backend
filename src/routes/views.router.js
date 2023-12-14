import { Router } from 'express';
import {ProductManagerDB} from '../dao/mongo/ProductManagerDB.js'
export const router=Router()

//instantiated class DB 
const pm =  new ProductManagerDB;


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

router.get('/chat',(req,res)=>{

    res.status(200).render('chat',{
        titulo:"Chat"
    })
})

