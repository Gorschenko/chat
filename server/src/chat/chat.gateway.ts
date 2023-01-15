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
import { CreateMessageDto } from 'src/message/dto/CreateMessageDto'
import { MessageService } from 'src/message/message.service'

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/api',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messageService: MessageService) {}
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

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody('message') message: CreateMessageDto): Promise<void> {
    const newMessage = await this.messageService.createMessage(message)
    this.server.to(newMessage.roomId.toString()).emit('getMessages', newMessage)
  }
}
