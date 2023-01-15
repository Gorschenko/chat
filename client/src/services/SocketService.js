import * as constants from '@/services/socketService.constants'

export default class SocketService {
  constructor (socket) {
    this.socket = socket
  }

  connect () {
    this.socket.auth.token = localStorage.getItem('token')
    this.socket.connect()
  }

  disconnect () {
    this.socket.removeAllListeners()
    this.socket.disconnect()
  }

  joinToRoom (roomId) {
    this.socket.emit(constants.emiters.JOIN_TO_ROOM, { roomId })
  }
  
  sendMessage (message) {
    this.socket.emit(constants.emiters.SEND_MESSAGE, { message })
  }

  getMessages () {
    this.socket.on(constants.listeners.GET_MESSAGES, message => {
      console.log(message)
    })
  }
}