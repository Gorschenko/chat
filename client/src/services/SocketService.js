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
    this.socket.disconnect()
  }

  joinToRoom (roomId) {
    this.socket.emit(constants.emiters.JOIN_TO_ROOM, { roomId })
  }

  // subscribeToMessage () {
  //   this.socket.on('send-message', message => message)
  // }
}