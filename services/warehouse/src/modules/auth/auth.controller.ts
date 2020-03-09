import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from 'src/entities/user.entity'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async signUp(@Body('firstName') firstName: string, @Body('lastName') lastName: string): Promise<User> {
    const user = await this.authService.signUpByEmail(firstName, lastName)
    return user
  }
}
