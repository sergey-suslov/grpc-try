import { IsEmail, MinLength } from 'class-validator'

export class SignInBody {
  @IsEmail()
  email: string

  @MinLength(5)
  password: string
}