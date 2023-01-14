import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'

export interface MessageModel extends Base {}

export class MessageModel extends TimeStamps {
  @prop()
  userId: Types.ObjectId

  @prop()
  roomId: Types.ObjectId

  @prop()
  text: string
}
