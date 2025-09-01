import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { AddressService } from '../../../services/address.service';
import { Address, OrderLine } from '../../../generated';
import { map, reduce, tap } from 'rxjs';
import { AddressCardComponent } from '../../address/address-card/address-card.component';
import { Cart } from '../../../model/cart';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { AddressSelectorComponent } from '../../address/address-selector/address-selector.component';
import { OrderLineComponent } from '../../order/order-line/order-line.component';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-order-page',
  imports: [
    CommonModule,
    AddressCardComponent,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    OrderLineComponent,
    RouterModule,
    AddressSelectorComponent,
    MatListModule,
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
})
export class OrderPageComponent {
  orderLines?: OrderLine[];
  addresses?: Address[];

  billingAddress?: Address;
  shippingAddress?: Address;

  total?: number;

  success = false;

  constructor(
    private cartService: CartService,
    private addressService: AddressService,
    private orderService: OrderService
  ) {
    this.addressService
      .getAddresses()
      .pipe(
        tap(
          (addresses) =>
            (this.billingAddress = addresses.find((a) => a.billing)!)
        ),
        tap(
          (addresses) =>
            (this.shippingAddress = addresses.find((a) => a.default)!)
        )
      )
      .subscribe((addresses) => (this.addresses = addresses));

    this.cartService.cart
      .pipe(
        map((cart: Cart) =>
          cart.products.map((cartItem) => {
            return {
              productId: cartItem.id,
              productName: cartItem.name,
              quantity: cartItem.qty,
              salePrice: cartItem.salePrice,
            } as OrderLine;
          })
        ),
        tap(
          (orderLines) =>
            (this.total = orderLines
              .map((ol) => ol.quantity! * ol.salePrice!)
              .reduce((a, b) => a + b))
        )
      )
      .subscribe((orderLines) => (this.orderLines = orderLines));
  }

  placeOrder() {
    this.orderService
      .placeOrder(
        this.billingAddress!.id!,
        this.shippingAddress!.id!,
        this.orderLines!
      )
      .subscribe((order) => (this.success = !!order));
  }
}
