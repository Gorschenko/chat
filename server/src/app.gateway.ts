import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  // OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

const users: Record<string, string> = {}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  handleConnection(client: Socket): void {
    console.log(client)
    const userName = client.handshake.query.userName as string
    const socketId = client.id
    users[socketId] = userName
    // client.broadcast.emit('log', `${userName} connected`)
  }

  handleDisconnect(client: Socket): void {
    const socketId = client.id
    const userName = users[socketId]
    delete users[socketId]
    // client.broadcast.emit('log', `${userName} disconnected`)
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload)
  }
}
