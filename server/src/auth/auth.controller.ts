import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UserModel } from 'src/user/user.model'
import { UserService } from 'src/user/user.service'
import { AUTH_ALREADY_REGISTERED_ERROR } from './auth.constants'
import { DocumentType } from '@typegoose/typegoose/lib/types'
import { AuthService, SignInPayload } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('sign-up')
  async signUp(@Body() dto: AuthDto): Promise<DocumentType<UserModel>> {
    const oldUser = await this.userService.findUser(dto.email)
    if (oldUser) {
      throw new BadRequestException(AUTH_ALREADY_REGISTERED_ERROR)
    }
    return await this.userService.createUser(dto)
  }

  @UsePipes(new ValidationPipe())
  @Post('sign-in')
  async signIn(@Body() dto: AuthDto): Promise<SignInPayload> {
    const user = await this.userService.validateUser(dto)
    return this.authService.signIn(dto.email)
  }
}
