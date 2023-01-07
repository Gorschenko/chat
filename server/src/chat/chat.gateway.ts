import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/api',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  handleConnection(@ConnectedSocket() client: Socket): void {
    console.log(1)
  }

  handleDisconnect(@ConnectedSocket() client: Socket): void {
    console.log(2)
  }
}
