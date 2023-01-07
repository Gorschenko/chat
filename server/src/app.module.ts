import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { getMongoConfig } from './configs/mongo.config'
import { MessageModule } from './message/message.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { RoomModule } from './room/room.module'
import { ChatModule } from './chat/chat.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    MessageModule,
    AuthModule,
    UserModule,
    RoomModule,
    ChatModule,
  ],
})
export class AppModule {}
