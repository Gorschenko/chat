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
import { Delete } from '@nestjs/common/decorators'
import { DocumentType } from '@typegoose/typegoose'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards'
import { IdValidationPipe } from 'src/pipes/add-validation.pipe'
import { CreateMessageDto } from './dto/CreateMessageDto'
import { MessageModel } from './message.model'
import { FoundMessagesType, MessageService } from './message.service'

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':roomId')
  async findAllMessages(
    @Param('roomId', IdValidationPipe) roomId: string,
  ): Promise<FoundMessagesType> {
    return await this.messageService.findAllMessages(roomId)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createMessage(@Body() dto: CreateMessageDto): Promise<DocumentType<MessageModel>> {
    return await this.messageService.createMessage(dto)
  }

  @Delete(':roomId')
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async deleteAllMessages(@Param('roomId', IdValidationPipe) roomId: string) {
    return await this.messageService.deleteAllMessages(roomId)
  }
}
