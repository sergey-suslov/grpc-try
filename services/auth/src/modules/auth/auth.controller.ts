import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from 'src/entities/user.entity'
import { SignUpBody } from './bodies/SignUpBody'

@Controller('public')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  async signUp(@Body() signUpBody: SignUpBody): Promise<User> {
    const user = await this.authService.signUpByEmail(signUpBody.email, signUpBody.password)
    return user
  }
}
