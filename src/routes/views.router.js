import { Router } from 'express';
import {productsModel} from '../dao/models/products.model.js'
import {cartModel} from '../dao/models/carts.model.js'

import {usersModel} from '../dao/models/users.model.js'

export const router=Router()

//midd
const auth=(req, res, next)=>{
    if(!req.session.usuario){
        res.redirect('/')
    }
    next()
}

router.get('/home',auth,async (req,res)=>{
    let pag = 1;
    if(req.query.pag){
        pag=req.query.pag
    }
  
    
    let products
    try {
        products =  await productsModel.find().lean();
        /*products = await productsModel.paginate({},{lean:true,limit:6, page:pag })
        console.log(products);
        let {totalPages,page,hasNextPage,hasPrevPage,prevPage,nextPage} = products
        res.status(200).render('home', { products:products.docs,totalPages,page,hasNextPage,hasPrevPage,prevPage,nextPage, 
             estilo:"style"})*/

       res.status(200).render('home', {products, estilo:"style"}) 
       
    } catch (error) {
        console.log(error);
        products=[]
    }
})

/*
router.get('/:cid', async (req, res) => {
	if(!req.params.cid) return 

	try{
		const cartId = req.params.cid

		const currentCart = await cartModel.findOne({_id:cartId}) 

		res.render('cart', { data: currentCart})
	}catch(error){
		console.log(error);
	}
})*/

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


router.get('/register',(req,res)=>{

    let {error}=req.query

    res.setHeader('Content-Type','text/html')
    res.status(200).render('register', {error})
})


router.get('/',(req,res)=>{

    let {error, mensaje}=req.query

    res.setHeader('Content-Type','text/html')
    res.status(200).render('login', {error, mensaje})
})