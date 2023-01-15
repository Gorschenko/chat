import { Injectable } from '@nestjs/common'
import { DocumentType } from '@typegoose/typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/user/user.model'
import { CreateMessageDto } from './dto/CreateMessageDto'
import { MessageModel } from './message.model'

export type FoundMessagesType = DocumentType<Omit<MessageModel, 'userId'> & { user: UserModel }>[]
@Injectable()
export class MessageService {
  constructor(@InjectModel(MessageModel) private readonly messageModel: ModelType<MessageModel>) {}
  async findAllMessages(roomId: string): Promise<FoundMessagesType> {
    return (await this.messageModel
      .aggregate()
      .match({
        roomId: new Types.ObjectId(roomId),
      })
      .lookup({
        from: 'User',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      })
      .project({
        userId: 0,
        'user.hashPassword': 0,
      })
      .exec()) as unknown as FoundMessagesType
  }

  async createMessage(dto: CreateMessageDto): Promise<DocumentType<MessageModel>> {
    return await this.messageModel.create(dto)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async deleteAllMessages(roomId: string) {
    return await this.messageModel.deleteMany({ roomId: new Types.ObjectId(roomId) }).exec()
  }
}
