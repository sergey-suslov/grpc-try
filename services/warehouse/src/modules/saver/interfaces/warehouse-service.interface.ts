import { Observable } from 'rxjs'
import { StoreItemResponse } from '../../warehouse/interfaces/store-item-response.interface'

export interface WarehouseService {
  storeItem({ userId: number, name: string }): Observable<StoreItemResponse>
}
