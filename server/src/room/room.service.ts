import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CreateRoomDto } from './dto/create-room.dto'
import { DocumentType } from '@typegoose/typegoose/lib/types'
import { RoomModel } from './room.model'

@Injectable()
export class RoomService {
  constructor(@InjectModel(RoomModel) private readonly roomModel: ModelType<RoomModel>) {}

  async createRoom(dto: CreateRoomDto): Promise<DocumentType<RoomModel>> {
    return await this.roomModel.create(dto)
  }

  async findAllRooms(): Promise<DocumentType<RoomModel>[]> {
    return await this.roomModel.find().exec()
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async deleteAllRooms() {
    return await this.roomModel.deleteMany()
  }
}
