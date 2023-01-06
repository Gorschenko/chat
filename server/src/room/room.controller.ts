import {
  Body,
  Controller,
  UseGuards,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Delete,
} from '@nestjs/common'
import { RoomModel } from './room.model'
import { DocumentType } from '@typegoose/typegoose/lib/types'
import { RoomService } from './room.service'
import { CreateRoomDto } from './dto/create-room.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards'

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async createRoom(@Body() dto: CreateRoomDto): Promise<DocumentType<RoomModel>> {
    return await this.roomService.createRoom(dto)
  }

  @Get()
  async findAllRooms(): Promise<DocumentType<RoomModel>[]> {
    return await this.roomService.findAllRooms()
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async deleteAllRooms() {
    return await this.roomService.deleteAllRooms()
  }
}
