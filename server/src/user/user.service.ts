import { Injectable, UnauthorizedException } from '@nestjs/common'
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types'
import { compare, genSalt, hash } from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { USER_NOT_FOUND_ERROR, USER_WRONG_PASSWORD_ERROR } from './user.constants'
import { UserModel } from './user.model'

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  async findUser(email: string): Promise<DocumentType<UserModel> | null> {
    return await this.userModel.findOne({ email }).exec()
  }

  async createUser({ email, password }: AuthDto): Promise<DocumentType<UserModel>> {
    const salt = await genSalt(10)
    const newUser = new this.userModel({
      email: email,
      hashPassword: await hash(password, salt),
    })
    return newUser.save()
  }

  async validateUser({ email, password }: AuthDto): Promise<boolean> {
    const user = await this.findUser(email)
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
    }
    const isCorrectPassword = await compare(password, user.hashPassword)
    if (!isCorrectPassword) {
      throw new UnauthorizedException(USER_WRONG_PASSWORD_ERROR)
    }
    return true
  }
}
