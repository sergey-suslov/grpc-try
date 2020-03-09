import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/entities/user.entity'

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  signUpByEmail(email: string, password: string): Promise<User> {
    const userModel = User.generateFromEmail(email, password)
    const user = this.userRepository.create(userModel)
    return this.userRepository.save(user)
  }
}
