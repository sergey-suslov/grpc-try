import { Module } from '@nestjs/common'
import { WarehouseController } from './warehouse.controller'
import { WarehouseService } from './warehouse.service'

@Module({
  imports: [],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
