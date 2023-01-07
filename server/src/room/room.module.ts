import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { RoomController } from './room.controller'
import { RoomModel } from './room.model'
import { RoomService } from './room.service'

@Module({
  controllers: [RoomController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: RoomModel,
        schemaOptions: {
          collection: 'Room',
        },
      },
    ]),
    UserModule,
  ],
  providers: [RoomService],
})
export class RoomModule {}
