import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { DocumentType } from '@typegoose/typegoose'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards'
import { IdValidationPipe } from 'src/pipes/add-validation.pipe'
import { UserModel } from 'src/user/user.model'
import { CreateMessageDto } from './dto/CreateMessageDto'
import { MessageModel } from './message.model'
import { MessageService } from './message.service'

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':roomId')
  async findAllMessages(
    @Param('roomId', IdValidationPipe) roomId: string,
  ): Promise<DocumentType<Omit<MessageModel, 'userId'> & { user: UserModel }>[]> {
    return await this.messageService.findAllMessages(roomId)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createMessage(@Body() dto: CreateMessageDto): Promise<DocumentType<MessageModel>> {
    return await this.messageService.createMessage(dto)
  }
}
