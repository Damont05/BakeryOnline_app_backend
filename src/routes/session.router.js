import { Router } from 'express';
import { usersModel } from '../dao/models/users.model.js';
//import crypto from 'crypto'
//import sessions from 'express-session'
import { creaHash, validPass } from '../utils.js';
import passport from 'passport';

export const router=Router()

router.get('/errorLogin',(req,res)=>{
    return res.redirect('/?error=Error en el proceso de login')
})

router.post('/', passport.authenticate('login',{failureRedirect:'/api/sessions/errorLogin'}), async(req, res)=>{

    // let {email, password}=req.body
    // if(!email || !password){
    //     return res.redirect('/?error=Complete todos los datos')
    // }
    // console.log('email: ', email);

    // let usuario=await usersModel.findOne({email})
    // console.log('usuario: ', usuario);
    // if(!usuario){
    //     return res.redirect(`/?error=credenciales incorrectas`)
    // }

    // if(!validPass(usuario,password)){
    //     return res.redirect(`/?error=credenciales incorrectas`)
    // }
    
    // req.session.usuario={
    //     name:usuario.name, email:usuario.email
    // }

    // res.redirect('/home')

    req.session.usuario={
        nombre:req.user.nombre, email:req.user.email
    }

    res.redirect('/home')
})

router.get('/errorRegistro',(req,res)=>{
    return res.redirect('/register?error=Error en el proceso de registro')
})

router.post('/register', passport.authenticate('register', {failureRedirect:'/api/sessions/errorRegistro'}), async(req,res)=>{

    let {email}=req.body
    // let {name, email, password}=req.body
    // if(!name || !email || !password){ 
    //     return res.redirect('/register?error=Complete todos los datos')
    // }

    // let regMail=/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    // console.log("REGIS----: " , regMail.test(email))
    // if(!regMail.test(email)){
    //     return res.redirect('/register?error=Mail con formato incorrecto...!!!')
    // }

    // let existe=await usersModel.findOne({email})
    // if(existe){
    //     return res.redirect(`/register?error=Existen usuarios con email ${email} en la BD`)
    // }
    
    // //password=crypto.createHmac("sha256", "bakery123").update(password).digest("hex")
    // password=creaHash(password)
    // console.log('PASSWORD REGISTER CRYPTO1: ',password);
    // let usuario
    // try {
    //     console.log('name: ',name);
    //     console.log('email: ',email);
    //     console.log('password resgister 2: ',password);

    //     usuario=await usersModel.create({name, email, password})

    //     console.log('usuario: ',usuario);

    //     res.redirect(`/?mensaje=Usuario ${email} registrado correctamente`)
        
    // } catch (error) {
    //     console.log(error);
    //     res.redirect('/register?error=Error inesperado. Reintente en unos minutos')
    // }

    res.redirect(`/?mensaje=Usuario ${email} registrado correctamente`)
})

router.get('/logout',(req,res)=>{
    
    req.session.destroy(error=>{
        if(error){
            res.redirect('/?error=fallo en el logout')
        }
    })

    res.redirect('/')

});

router.get('/github', passport.authenticate('github',{}),(req,res)=>{})

router.get('/callbackGithub', passport.authenticate('github',{failureRedirect:"/api/sessions/errGithub"}),(req,res)=>{
    
    req.session.usuario=req.user
    res.redirect('/')

});


router.get('/errGithub', (req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    return  res.status(400).json({ ok:false, error: 'Error Autenticate GitHub'});
    

});