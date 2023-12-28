import { Router } from 'express';
import { usersModel } from '../dao/models/users.model.js';
import crypto from 'crypto'
export const router=Router()

router.post('/', async(req, res)=>{

    let {email, password}=req.body
    if(!email || !password){
        return res.redirect('/?error=Complete todos los datos')
    }

    password=crypto.createHmac("sha256", "codercoder123").update(password).digest("hex")

    let usuario=await usersModel.findOne({email, password})
    if(!usuario){
        return res.redirect(`/?error=credenciales incorrectas`)
    }
    
    req.session.usuario={
        name:usuario.name, email:usuario.email
    }

    res.redirect('/home')

})

router.post('/register',async(req,res)=>{

    let {name, email, password}=req.body
    if(!name || !email || !password){
        return res.redirect('/register?error=Complete todos los datos')
    }

    let regMail=/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    console.log(regMail.test(email))
    if(!regMail.test(email)){
        return res.redirect('/register?error=Mail con formato incorrecto...!!!')
    }

    let existe=await usersModel.findOne({email})
    if(existe){
        return res.redirect(`/register?error=Existen usuarios con email ${email} en la BD`)
    }
    
    password=crypto.createHmac("sha256", "codercoder123").update(password).digest("hex")
    let usuario
    try {
        usuario=await usersModel.create({name, email, password})
        res.redirect(`/?mensaje=Usuario ${email} registrado correctamente`)
        
    } catch (error) {
        res.redirect('/register?error=Error inesperado. Reintente en unos minutos')
    }


})

router.get('/logout',(req,res)=>{
    
    req.session.destroy(error=>{
        if(error){
            res.redirect('/?error=fallo en el logout')
        }
    })

    res.redirect('/')

});