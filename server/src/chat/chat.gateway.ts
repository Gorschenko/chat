import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/api',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  handleConnection(@ConnectedSocket() client: Socket): void {
    Logger.log(
      `Client ${client.id} connected. Token: ${client.handshake.auth.token}`,
      '[Websockets]',
    )
  }

  handleDisconnect(@ConnectedSocket() client: Socket): void {
    Logger.log(
      `Client ${client.id} disconnected. Token: ${client.handshake.auth.token}`,
      '[Websockets]',
    )
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody('roomId') roomId: number, @ConnectedSocket() client: Socket): void {
    client.join(roomId.toString())
  }
}
