import { Router } from 'express';
import {productsModel} from '../dao/models/products.model.js'
import {usersModel} from '../dao/models/users.model.js'

export const router=Router()

router.get('/',async (req,res)=>{
    let pag = 1;
    if(req.query.pag){
        pag=req.query.pag
    }

    let products
    try {
        //products =  await productsModel.find().lean();
        products = await productsModel.paginate({},{lean:true,limit:8, page:pag})
        console.log(products);
        let {totalPages,hasNextPage,hasPrevPage,prevPage,nextPage} = products
        res.status(200).render('home', { products:products.docs,totalPages,hasNextPage,hasPrevPage,prevPage,nextPage, 
             estilo:"style"})
       
    } catch (error) {
        console.log(error);
        products=[]
    }
})

//****ROUTE VIEW USER*****
router.get('/user',async (req,res)=>{
    let users    
    try {
        users =  await usersModel.find();
        res.status(200).render('users', {users,  estilo:"style"})
    } catch (error) {
        console.log(error);
        users=[]
    }
})

router.get('/realtimeproducts',async (req,res)=>{

    let products =  await pm.f_getProducts();
    res.status(200).render('realTimeProducts', {
        products
    })
})



