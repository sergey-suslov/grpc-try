import { Injectable } from '@nestjs/common'
import { get } from 'config'
import { sign, verify } from 'jsonwebtoken'
import { User } from 'src/entities/user.entity'

export interface JWTToken {
  userId: string
  created: Date
  lifetime: number
}

@Injectable()
export class JWTService {
  constructor() { }

  generateJWTForUser(user: User): string {
    return sign(
      {
        userId: user.id,
        created: new Date(),
        lifetime: get('jwt.lifetime'),
      },
      process.env.JWT_SECRET || get('jwt.secret'),
    )
  }

  generateJWTRefreshForUser(user: User): string {
    return sign(
      {
        userId: user.id,
        created: new Date(),
        lifetime: get('jwt.lifetimeRefresh'),
      },
      process.env.JWT_SECRET || get('jwt.secret'),
    )
  }

  decodeRefreshToken(refreshToken: string): null | JWTToken {
    const decoded: JWTToken = verify(refreshToken, process.env.JWT_SECRET || get('jwt.secret')) as JWTToken
    console.log(decoded)
    if (typeof decoded.userId !== "number" || decoded.created instanceof Date || typeof decoded.lifetime !== 'number') {
      return null
    }
    const token: JWTToken = {
      userId: decoded.userId,
      created: decoded.created,
      lifetime: decoded.lifetime,
    }
    return token
  }
}
