import { Router } from 'express';
import {productsModel} from '../dao/models/products.model.js'
import {productsModel} from '../dao/models/'
import {usersModel} from '../dao/models/users.model.js'

export const router=Router()

router.get('/products',async (req,res)=>{
    let pag = 1;
    if(req.query.pag){
        pag=req.query.pag
    }
  
    
    let products
    try {
        //products =  await productsModel.find().lean();
        products = await productsModel.paginate({},{lean:true,limit:6, page:pag })
        console.log(products);
        let {totalPages,page,hasNextPage,hasPrevPage,prevPage,nextPage} = products
        res.status(200).render('home', { products:products.docs,totalPages,page,hasNextPage,hasPrevPage,prevPage,nextPage, 
             estilo:"style"})
       
    } catch (error) {
        console.log(error);
        products=[]
    }
})

router.get('/:cid', async (req, res) => {
	if(!req.params.cid) return 

	try{
		const cartId = req.params.cid

		const currentCart = await cartManager.getCartById(cartId)

		res.render('products/cart', { data: currentCart, style: 'cart'})
	}catch(error){
		res.render('errors/error', { error: error })
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



