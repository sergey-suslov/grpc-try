import { Controller, Get, Inject } from '@nestjs/common'
import { Logger } from 'pino'
import { SaverService } from './saver.service'
import { StoreItemResponse } from '../warehouse/interfaces/store-item-response.interface'

@Controller()
export class SaverController {
  constructor(private readonly appService: SaverService) {}

  @Get()
  storeItem(): Promise<StoreItemResponse> {
    return this.appService.storeItem()
  }
}
