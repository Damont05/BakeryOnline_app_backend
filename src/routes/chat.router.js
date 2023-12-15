import { Router } from 'express'
import chatSocket from '../config/chat.socket.js'

const router = Router()

const chatRouter = (io) => {
	chatSocket(io)
	
	router.get('/',(req,res)=>{

        res.status(200).render('chat',{
            estilo:"style-chat"
        })
    })
	
	return router
}

export default chatRouter