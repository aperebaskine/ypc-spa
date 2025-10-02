import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { MeService as MeApi, OrderLine } from '../generated';
import { CartService } from './cart.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private orderApi: MeApi,
    private cartService: CartService,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  placeOrder(
    billingAddressId: number,
    shippingAddressId: number,
    orderLines: OrderLine[]
  ) {
    return this.orderApi.createMyOrder(
      billingAddressId, 
      shippingAddressId, 
      JSON.stringify(orderLines)
    ).pipe(
      tap(
        (order) => {
          if (order) {
            this.cartService.clear();
          }
        }
      )
    );
  }

  findAll() {
    return this.orderApi.getMyOrders(this.locale);
  }
}
