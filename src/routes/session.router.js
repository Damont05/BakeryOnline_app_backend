import { Router } from 'express';
import passport from 'passport';
import { UserReadDTO } from '../config/userDTO.js';
import { logger } from '../utils/loggers.js';
export const router=Router()

router.get('/errorLogin',(req,res)=>{
    return res.redirect('/login?error=Error en el proceso de login... :(')
})

router.post('/login', passport.authenticate('login',{failureRedirect:'/api/sessions/errorLogin'}), async(req, res)=>{

    req.session.user={
        first_name:req.user.first_name, email:req.user.email , rol: req.user.role, car: req.user.car
    }
    logger.info(req.session.user);
    res.redirect('/products')

})

router.post('/register', passport.authenticate('register', {failureRedirect:'/api/sessions/errorRegister'}), async(req,res)=>{
    let {email}=req.body
    res.redirect(`/login?mensaje=Usuario ${email} registrado correctamente`)

})

router.get('/errorRegister',(req,res)=>{
    return res.redirect('/registro?error=Error en el proceso de registro')
})

router.get('/github', passport.authenticate('github',{}), (req,res)=>{})

router.get('/callbackGithub', passport.authenticate('github',{failureRedirect:"/api/sessions/errorGithub"}), (req,res)=>{
    req.session.user=req.user
    res.redirect('/api/products')
});

router.get('/errorGithub',(req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        error: "Error al autenticar con Github"
    });
});

router.get('/logout',(req,res)=>{
    
    req.session.destroy(error=>{
        if(error){
            res.redirect('/login?error=fallo en el logout')
        }
    })

    res.redirect('/login')

});

router.get('/current',(req,res)=>{
    
    res.status(200).json(new UserReadDTO(req.user));
});