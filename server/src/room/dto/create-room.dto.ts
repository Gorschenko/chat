import { IsMongoId, IsString } from 'class-validator'

export class CreateRoomDto {
  @IsString()
  name: string

  @IsMongoId()
  ownerId: string
}
