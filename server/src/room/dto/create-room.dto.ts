import { IsMongoId, IsOptional, IsString } from 'class-validator'

export class CreateRoomDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsMongoId()
  ownerId: string
}
