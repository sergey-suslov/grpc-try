import { Module } from '@nestjs/common'
import { resolve } from 'path'
import { SaverController } from './saver.controller'
import { SaverService } from './saver.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WAREHOUSE_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051',
          package: 'warehouse',
          protoPath: resolve(__dirname, '../../../../../protobuf/warehouse.proto'),
        },
      },
    ]),
  ],
  controllers: [SaverController],
  providers: [SaverService],
})
export class SaverModule {}
