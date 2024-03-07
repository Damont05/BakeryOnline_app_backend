import passport from "passport";
import github from "passport-github2"
import local from "passport-local"
import {usersModel} from "../dao/models/users.model.js"
import { creaHash, validPass } from '../utils/utils.js'
import { config } from './config.js'
import { logger } from "../utils/loggers.js";

export const initPassport=()=>{

    passport.use('register', new local.Strategy(
        {
            passReqToCallback: true, usernameField: 'email'
        },
        async(req,username, password, done) => {

            try {
                
                let {first_name,last_name, email,age}=req.body
                let role = 'user'
    
                if(!first_name || !last_name || !email || !password || !age ){
                    //return res.redirect('/register?error=Complete todos los datos')
                    return done(null, false)
                }
    
                let regMail=/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
                if(!regMail.test(email)){ 
                    //return res.redirect('/register?error=Mail con formato incorrecto...!!!')
                    return done(null, false)
                }
    
                let exist=await usersModel.findOne({email})
                if(exist){                            
                    //return res.redirect(`/register?error=Existen usuarios con email ${email} en la BD`)
                    return done(null, false)
                }
               
                //password=crypto.createHmac("sha256", "bakery123").update(password).digest("hex")
                password=creaHash(password)
                logger.info('PASSWORD REGISTER CRYPTO1: ',password);
    
                let user
                try {
                    user=await usersModel.create({first_name,last_name, email, password, role})
                    return done(null, user)
                
                } catch (error) {
                    return done(null,false);
                }
            } catch (error) {
                return done(error);
            }
        }
    ))

    passport.use('login', new local.Strategy(
        {
            usernameField: 'email'
        },
        async(username, password, done)=>{
            try {
                
                logger.info("Estrategia local LOGIN de Passport...!!!")
    
                //let {email, password}=req.body
                if(!username  || !password){
                    //return res.redirect('/?error=Complete todos los datos')
                    return done(null, false)
                }
    
                let user=await usersModel.findOne({email:username}).lean()
                // console.log('usuario: ', usuario);
                if(!user){
                    //return res.redirect(`/?error=credenciales incorrectas`)
                    return done(null, false)
                }
    
                if(!validPass(user,password)){
                    //return res.redirect(`/?error=credenciales incorrectas`)
                    return done(null, false)
                }
                logger.info("USER: ", user);
                logger.info(Object.keys(user))
                delete user.password
                return done(null, user)

            } catch (error) {
                 return done(error,null)
            }
        }
    ))

    passport.use('github' , new github.Strategy(
        {
            clientID:config.CLIENT_ID,
            clientSecret:config.CLIENT_SECRET,
            callbackURL:config.CALLBACK_URL,

        },
        async(accessToken,refreshToken,profile,done)=>{

            try {
                let user = await usersModel.findOne({email:profile._json.email})
                if(!user){
                    let newUser =  {
                        name: profile._json.name,
                        email: profile._json.email,
                        rol: 'user', 
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
