import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface MessageModel extends Base {}

export class MessageModel extends TimeStamps {
  @prop()
  userId: string

  @prop()
  userName: string

  @prop()
  text: string
}
