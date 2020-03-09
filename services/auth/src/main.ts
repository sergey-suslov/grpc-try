import { NestFactory } from '@nestjs/core'
import { get } from 'config'
import * as expressPinoLogger from 'express-pino-logger'
import { loggerExpress } from './common/logger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const appModule = await NestFactory.create(AppModule)
  appModule.use(expressPinoLogger({ logger: loggerExpress }))
  appModule.useGlobalPipes(new ValidationPipe())
  await appModule.listen(get('port'))
}
bootstrap()
