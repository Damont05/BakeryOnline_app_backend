import chatManager from '../dao/manager/ChatManagerDB.js'

const chatSocket = (io) => {
	io.on('connection', async (socket) => {
		const history = await chatManager.getMessages() 
		io.emit('history', history)

		socket.on('message', async (message) => {
			const createdMessage = await chatManager.createMessage(message.user, message.message)

			const history = await chatManager.getMessages() 
			io.emit('history', history)
		})
	})
}

export default chatSocket