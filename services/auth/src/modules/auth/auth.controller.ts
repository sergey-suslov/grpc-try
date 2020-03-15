import { Controller, Post, Body, HttpException, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'
import { AuthService, AuthCredentials } from './auth.service'
import { User } from 'src/entities/user.entity'
import { SignUpBody } from './bodies/SignUpBody'
import { SignInBody } from './bodies/SignInBody'
import { RefreshTokenBody } from 'src/modules/auth/bodies/RefreshTokenBody'

@Controller('public')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  async signUp(@Body() signUpBody: SignUpBody): Promise<User> {
    const user = await this.authService.signUpByEmail(signUpBody.email, signUpBody.password)
    if (user === null) {
      throw new HttpException('User with the given email already exists', HttpStatus.BAD_REQUEST)
    }
    return user
  }

  @Post('sign-in')
  async signIn(@Body() signUpBody: SignInBody, @Res() response: Response): Promise<Response<any>> {
    const authOrNull = await this.authService.signInByEmail(signUpBody.email, signUpBody.password)
    if (authOrNull === null) {
      throw new HttpException('No user with the given email or pussword', HttpStatus.BAD_REQUEST)
    }
    response.cookie('token', authOrNull.token)
    return response.json(authOrNull)
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenBody: RefreshTokenBody): Promise<AuthCredentials> {
    const decoded: AuthCredentials = await this.authService.refreshToken(refreshTokenBody.refreshToken)
    if (decoded === null) {
      throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST)
    }
    return decoded
  }
}
