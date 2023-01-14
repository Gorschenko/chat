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

  @SubscribeMessage('joinToRoom')
  joinToRoom(@MessageBody('roomId') roomId: number, @ConnectedSocket() client: Socket): void {
    client.join(roomId.toString())
  }

  // @SubscribeMessage('leaveRoom')
  // leaveRoom(@MessageBody('roomId') roomId: number, @ConnectedSocket() client: Socket): void {
  //   client.leave(roomId.toString())
  //   client.disconnect()
  // }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @MessageBody('message') newMessage: object,
    @ConnectedSocket() client: Socket,
  ): void {}
}
