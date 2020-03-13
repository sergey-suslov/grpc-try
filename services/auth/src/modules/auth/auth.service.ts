import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/entities/user.entity'
import { JWTService } from './shared/jwt.service'

export interface AuthCredentials {
  token: string
  tokenRefresh: string
}

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JWTService
  ) { }

  signUpByEmail(email: string, password: string): Promise<User> {
    const userModel = User.generateFromEmail(email, password)
    const user = this.userRepository.create(userModel)
    return this.userRepository.save(user)
  }

  async signInByEmail(email: string, password: string): Promise<null | AuthCredentials> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      }
    })

    if (user === null || !user.comparePasswords(password)) {
      return null
    }

    const token = this.jwtService.generateJWTForUser(user)
    const tokenRefresh = this.jwtService.generateJWTRefreshForUser(user)

    return { token, tokenRefresh }
  }
}
