import { Injectable } from '@nestjs/common'
import { DocumentType } from '@typegoose/typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { MessageModel } from './message.model'

@Injectable()
export class MessageService {
  constructor(@InjectModel(MessageModel) private readonly messageModel: ModelType<MessageModel>) {}
  async findAllMessages(id: string): Promise<DocumentType<MessageModel>[]> {
    return await this.messageModel.find({ roomId: id })
  }
}
