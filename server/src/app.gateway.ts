import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

const users: Record<string, string> = {}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  serveClient: false,
  namespace: 'chat',
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  afterInit(server: Server): void {
    console.log(server)
  }

  handleConnection(client: Socket): void {
    const userName = client.handshake.query.userName as string
    const socketId = client.id
    users[socketId] = userName
    client.broadcast.emit('log', `${userName} connected`)
  }

  handleDisconnect(client: Socket): void {
    const socketId = client.id
    const userName = users[socketId]
    delete users[socketId]
    client.broadcast.emit('log', `${userName} disconnected`)
  }
}
