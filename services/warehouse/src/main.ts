import { NestFactory } from '@nestjs/core'
import * as expressPinoLogger from 'express-pino-logger'
import { join } from 'path'
import { WarehouseModule } from './modules/warehouse/warehouse.module'
import { SaverModule } from './modules/saver/saver.module'
import { Transport } from '@nestjs/common/enums/transport.enum'
import { loggerExpress } from './common/logger'
import { AuthModule } from './modules/auth/auth.module'

async function bootstrap() {
  const warehouseService = await NestFactory.createMicroservice(WarehouseModule, {
    transport: Transport.GRPC,
    options: {
      package: 'warehouse',
      protoPath: join(__dirname, '../../../protobuf/warehouse.proto'),
      url: 'localhost:50051',
    },
  })
  warehouseService.listenAsync()
  
  const saverClient = await NestFactory.create(SaverModule)
  saverClient.use(expressPinoLogger({ logger: loggerExpress }))
  await saverClient.listen('3000')

  const authModule = await NestFactory.create(AuthModule)
  authModule.use(expressPinoLogger({ logger: loggerExpress }))
  await authModule.listen('3001')
}
bootstrap()
