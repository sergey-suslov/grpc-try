import { Injectable } from '@nestjs/common'
import { Item } from './interfaces/item.interface'

@Injectable()
export class WarehouseService {
  storeItem(): Item {
    return {
      id: 1,
      name: 'Stored item name',
      userId: 1,
    }
  }
}
