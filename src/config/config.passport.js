import passport from "passport";
import github from "passport-github2"
import local from "passport-local"
import {usersModel} from "../dao/models/users.model.js"
import { creaHash, validPass } from '../utils.js'

export const initPassport=()=>{

    passport.use('register', new local.Strategy(
        {
            passReqToCallback: true, usernameField: 'email'
        },
        async(req,username, password, done) => {

            let {name, email}=req.body
            if(!name || !email || !password){
                //return res.redirect('/register?error=Complete todos los datos')
                return done(null, false)
            }

            let regMail=/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
            if(!regMail.test(email)){
                //return res.redirect('/register?error=Mail con formato incorrecto...!!!')
                return done(null, false)
            }

            let existe=await usersModel.findOne({email})
            if(existe){
                //return res.redirect(`/register?error=Existen usuarios con email ${email} en la BD`)
                return done(null, false)
            }
            
            //password=crypto.createHmac("sha256", "bakery123").update(password).digest("hex")
            password=creaHash(password)
            console.log('PASSWORD REGISTER CRYPTO1: ',password);
            let usuario
            try {

                usuario=await usersModel.create({name, email, password})

                //res.redirect(`/?mensaje=Usuario ${email} registrado correctamente`)

                return done(null, usuario)
                
            } catch (error) {
                //res.redirect('/register?error=Error inesperado. Reintente en unos minutos')
                return done(null, false)
            }
        }
    ))

    passport.use('login', new local.Strategy(
        {
            usernameField: 'email'
        },
        async(email, password, done)=>{
            try {
                
                console.log("Estrategia local LOGIN de Passport...!!!")
    
                //let {email, password}=req.body
                if(!email  || !password){
                    //return res.redirect('/?error=Complete todos los datos')
                    return done(null, false)
                }
    
                let usuario=await usersModel.findOne({email}).lean()
                // console.log('usuario: ', usuario);
                if(!usuario){
                    //return res.redirect(`/?error=credenciales incorrectas`)
                    return done(null, false)
                }
    
                if(!validPass(usuario,password)){
                    //return res.redirect(`/?error=credenciales incorrectas`)
                    return done(null, false)
                }
                
                console.log(Object.keys(usuario))
                delete usuario.password
                return done(null, usuario)

            } catch (error) {
                 return done(error)
            }
        }

    ))

    passport.use('github' , new github.Strategy(
        {
            clientID:"Iv1.20547c8065035614",
            clientSecret:"60082e580fe147352cc1cf17c7bde2172060dc18",
            callbackURL:"http://localhost:8080/api/sessions/callbackGithub",

        },
        async(accessToken,refreshToken,profile,done)=>{

            try {
                //console.log("profile: ", profile);
                let user = await usersModel.findOne({email:profile._json.email})
                if(!user){
                    let newUser =  {
                        name: profile._json.name,
                        email: profile._json.email,
                        profile
                    }
                    user = await usersModel.create(newUser)
                }
                return done(null, user)
            } catch (error) {
                return done(error);
            }
        }
    ))

    //serializador  
    passport.serializeUser((user,done)=>done(null, user._id))
    //deserializador
    passport.deserializeUser(async (id,done)=>{
        let user = await usersModel.findById(id)
        return done(null, user)
    })
    
} //end initPassport
