import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { JWTService } from './shared/jwt.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), JWTService],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
