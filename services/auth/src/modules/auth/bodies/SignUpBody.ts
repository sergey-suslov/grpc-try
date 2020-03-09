import { IsEmail, MinLength } from 'class-validator'

export class SignUpBody {
  @IsEmail()
  email: string

  @MinLength(5)
  password: string
}