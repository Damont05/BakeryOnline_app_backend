import { Router } from 'express';
//import { logger } from '../utils/loggers';
export const router=Router()

const auth=(req, res, next)=>{
    if(!req.session.user){
        res.redirect('/login')
    }
    next()
}

router.get('/',(req,res)=>{

    let {error, mensaje}=req.query

    res.setHeader('Content-Type','text/html')
    res.status(200).render('login', {estilo:"style"})
})

router.get('/home',(req,res)=>{

    res.setHeader('Content-Type','text/html')
    res.status(200).render('home',{estilo:"style"})
})

router.get('/register',(req,res)=>{

    let {error}=req.query

    res.setHeader('Content-Type','text/html')
    res.status(200).render('register', {error,estilo:"style"})
})

router.get('/products',auth,async (req,res)=>{
    
    let user=req.session.user
    
    let pag = 1;
    if(req.query.pag){
        pag=req.query.pag
    }
    
    let products
    try {
        products =  await productService.getProducts();
        res.status(200).render('products', {products, user,estilo:"style", login:true}) 
       
    } catch (error) {
        console.log(error);
        products=[]
    }
})




router.get('/login',(req,res)=>{

    console.log("entrando al /login");
    let {error, mensaje}=req.query
    console.log({error, mensaje})
    res.setHeader('Content-Type','text/html')

    res.status(200).render('login', {error, mensaje,estilo:"style"})
})

router.get('/profile', auth, (req,res)=>{

    let user=req.session.user

    res.setHeader('Content-Type','text/html')
    res.status(200).render('perfil', {user})
})

router.get('/crudProduct', auth, (req,res)=>{

    let user=req.session.user

    res.setHeader('Content-Type','text/html')
    res.status(200).render('CRUDproducts')
})

