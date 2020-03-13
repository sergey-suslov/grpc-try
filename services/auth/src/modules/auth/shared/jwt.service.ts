import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { get } from 'config'
import { sign } from 'jsonwebtoken'
import { User } from 'src/entities/user.entity'

@Injectable()
export class JWTService {

  constructor() { }

  generateJWTForUser(user: User): string {
    return sign({
      userId: user.id,
      created: new Date(),
      lifetime: get('jst.lifetime')
    }, process.env.JWT_SECRET || get('jst.secret'))
  }

  generateJWTRefreshForUser(user: User): string {
    return sign({
      userId: user.id,
      created: new Date(),
      lifetime: get('jst.lifetimeRefresh')
    }, process.env.JWT_SECRET || get('jst.secret'))
  }
}
