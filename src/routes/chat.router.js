import { Router } from 'express'
import chatSocket from '../config/chat.socket.js'
import {ProductManagerDB} from '../dao/mongo/ProductManagerDB.js'
//instantiated class DB 
const pm =  new ProductManagerDB;

const router = Router()

const chatRouter = (io) => {
	chatSocket(io)
	
	router.get('/', (req, res) => {
		try {
			res.render('chat')
		} catch (error) {
			res.render({error})
		}
	})
	
	return router
}

export default chatRouter