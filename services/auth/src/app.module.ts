import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { get } from 'config'
import { AuthModule } from './modules/auth/auth.module'
import { User } from './entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: get('db.username'),
      password: get('db.password'),
      database: get('db.database'),
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
