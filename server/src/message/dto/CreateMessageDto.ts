import { IsMongoId, IsString } from 'class-validator'

export class CreateMessageDto {
  @IsMongoId()
  userId: string

  @IsMongoId()
  roomId: string

  @IsString()
  text: string
}
