import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WarehouseService } from './warehouse.service';
import { StoreItemResponse } from './interfaces/store-item-response.interface';

@Controller()
export class WarehouseController {
  constructor(private readonly appService: WarehouseService) {}

  @GrpcMethod('WarehouseService', 'StoreItem')
  getHello(): StoreItemResponse {
    return {
      storedItem: this.appService.storeItem(),
    };
  }
}
