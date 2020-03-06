import { NestFactory } from '@nestjs/core'
import { join } from 'path'
import { WarehouseModule } from './modules/warehouse/warehouse.module'
import { SaverModule } from './modules/saver/saver.module'
import { Transport } from '@nestjs/common/enums/transport.enum'

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
  await saverClient.listen('3000')
}
bootstrap()
