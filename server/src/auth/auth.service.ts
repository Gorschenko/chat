import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export interface SignInPayload {
  token: string
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(email: string): Promise<SignInPayload> {
    return {
      token: await this.jwtService.signAsync({ email }),
    }
  }
}
