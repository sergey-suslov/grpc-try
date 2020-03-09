import { Injectable, Inject, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { WarehouseService } from './interfaces/warehouse-service.interface'
import { StoreItemResponse } from '../warehouse/interfaces/store-item-response.interface'

@Injectable()
export class SaverService implements OnModuleInit {
  private warehouseService: WarehouseService

  constructor(@Inject('WAREHOUSE_SERVICE') private readonly clientWarehouseService: ClientGrpc) {}

  onModuleInit() {
    this.warehouseService = this.clientWarehouseService.getService<WarehouseService>('WarehouseService')
  }

  storeItem(): Promise<StoreItemResponse> {
    return this.warehouseService.storeItem({ userId: 1, name: 'name' }).toPromise()
  }
}
