import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'

export interface RoomModel extends Base {}
export class RoomModel extends TimeStamps {
  @prop()
  name: string

  @prop()
  description: string

  @prop()
  ownerId: Types.ObjectId

  @prop({ type: () => [Types.ObjectId] })
  membersIds: Types.ObjectId[]
}
