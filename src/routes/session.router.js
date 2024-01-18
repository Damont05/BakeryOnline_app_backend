// import { MyRouter } from './router.js';


// export class SessionRouter extends MyRouter{
    
// }

import { Router } from 'express';
import passport from 'passport';

export const router=Router()

router.get('/errorLogin',(req,res)=>{
    return res.redirect('/?error=Error en el proceso de login')
})

router.post('/', passport.authenticate('login',{failureRedirect:'/api/sessions/errorLogin'}), async(req, res)=>{

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
