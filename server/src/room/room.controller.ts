import {
  Body,
  Controller,
  UseGuards,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Delete,
  Param,
  ForbiddenException,
} from '@nestjs/common'
import { RoomModel } from './room.model'
import { DocumentType } from '@typegoose/typegoose/lib/types'
import { RoomService } from './room.service'
import { CreateRoomDto } from './dto/create-room.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards'
import { IdValidationPipe } from 'src/pipes/add-validation.pipe'
import { UserEmail } from 'src/decorators/user-email.decorator'
import { UserService } from 'src/user/user.service'
import { ROOM_NOT_REMOVED_ERROR } from './room.constants'

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @Delete('by-id/:id')
  async deleteRoomById(
    @Param('id', IdValidationPipe) id: string,
    @UserEmail() email: string,
  ): Promise<DocumentType<RoomModel>> {
    const [deletedRoom, user] = await Promise.all([
      this.roomService.findRoomById(id),
      this.userService.findUser(email),
    ])
    if (deletedRoom.ownerId === user._id) {
      throw new ForbiddenException(ROOM_NOT_REMOVED_ERROR)
    }
    return await this.roomService.deleteRoomById(id)
  }
}
