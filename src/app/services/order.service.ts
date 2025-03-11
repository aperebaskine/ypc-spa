import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DefaultService, OrderLine } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private defaultService: DefaultService,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  placeOrder(
    billingAddressId: number,
    shippingAddressId: number,
    orderLines: OrderLine[]
  ) {
    return this.defaultService.createOrder(
      billingAddressId, 
      shippingAddressId, 
      JSON.stringify(orderLines)
    );
  }

  findAll() {
    return this.defaultService.findAllOrders(this.locale);
  }
}
