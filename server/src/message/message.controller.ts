import { Controller, Get, Param } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import { DocumentType } from '@typegoose/typegoose'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards'
import { IdValidationPipe } from 'src/pipes/add-validation.pipe'
import { MessageModel } from './message.model'
import { MessageService } from './message.service'

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':id')
  async findAllMessages(
    @Param('id', IdValidationPipe) id: string,
  ): Promise<DocumentType<MessageModel>[]> {
    return await this.messageService.findAllMessages(id)
  }
}
