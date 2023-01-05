import { IsString, Min } from 'class-validator'

export class AuthDto {
  @IsString()
  email: string

  @Min(6)
  @IsString()
  password: string
}
