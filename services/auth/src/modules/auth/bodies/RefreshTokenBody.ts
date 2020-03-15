import { IsNotEmpty } from 'class-validator'

export class RefreshTokenBody {
  @IsNotEmpty()
  refreshToken: string
}
