import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards'
import { UserEmail } from 'src/decorators/user-email.decorator'
import { DocumentType } from '@typegoose/typegoose/lib/types'
import { UserModel } from './user.model'
import { UserService } from './user.service'

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getInfo(@UserEmail() email: string): Promise<DocumentType<UserModel>> {
    return this.userService.findUser(email)
  }
}
