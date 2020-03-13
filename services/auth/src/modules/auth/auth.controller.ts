import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common'
import { AuthService, AuthCredentials } from './auth.service'
import { User } from 'src/entities/user.entity'
import { SignUpBody } from './bodies/SignUpBody'
import { SignInBody } from './bodies/SignInBody'

@Controller('public')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  async signUp(@Body() signUpBody: SignUpBody): Promise<User> {
    const user = await this.authService.signUpByEmail(signUpBody.email, signUpBody.password)
    return user
  }

  @Post('sign-in')
  async signIn(@Body() signUpBody: SignInBody, ): Promise<AuthCredentials> {
    const authOrNull = await this.authService.signInByEmail(signUpBody.email, signUpBody.password)
    if (authOrNull === null) {
      throw new HttpException('No user with the given email or pussword', HttpStatus.BAD_REQUEST)
    }

    return authOrNull
  }
}
