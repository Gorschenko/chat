import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CreateRoomDto } from './dto/create-room.dto'
import { DocumentType } from '@typegoose/typegoose/lib/types'
import { RoomModel } from './room.model'
import { ROOM_NOT_FOUND_ERROR } from './room.constants'

@Injectable()
export class RoomService {
  constructor(@InjectModel(RoomModel) private readonly roomModel: ModelType<RoomModel>) {}

  async createRoom(dto: CreateRoomDto): Promise<DocumentType<RoomModel>> {
    return await this.roomModel.create(dto)
  }

  async findAllRooms(): Promise<DocumentType<RoomModel>[]> {
    return await this.roomModel.find().exec()
  }

  async findRoomById(id: string): Promise<DocumentType<RoomModel>> {
    const room = await this.roomModel.findById(id).exec()
    if (!room) {
      throw new NotFoundException(ROOM_NOT_FOUND_ERROR)
    }
    return room
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async deleteAllRooms() {
    return await this.roomModel.deleteMany()
  }

  async deleteRoomById(roomId: string): Promise<DocumentType<RoomModel>> {
    const deletedRoom = await this.roomModel.findByIdAndRemove(roomId)
    if (!deletedRoom) {
      throw new NotFoundException(ROOM_NOT_FOUND_ERROR)
    }
    return deletedRoom
  }
}
