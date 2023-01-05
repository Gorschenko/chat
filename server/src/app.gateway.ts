import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  // OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

const users: Record<string, UserData> = {}
interface UserData {
  name?: string
}
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  handleConnection(@ConnectedSocket() client: Socket): void {
    users[client.id] = {}
  }

  handleDisconnect(@ConnectedSocket() client: Socket): void {
    this.server.emit('log', `Пользователь ${users[client.id].name} отключен`)
    delete users[client.id]
  }

  @SubscribeMessage('joinToChat')
  handleMessage(@MessageBody() userData: UserData, @ConnectedSocket() client: Socket): void {
    users[client.id] = { ...userData }
    this.server.emit('log', `Пользователь ${users[client.id].name} подключен`)
  }
}
