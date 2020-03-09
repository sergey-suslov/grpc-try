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

  signUpByEmail(firstName: string, lastName: string): Promise<User> {
    const user = this.userRepository.create({
      firstName,
      lastName,
    })
    return this.userRepository.save(user)
  }
}
