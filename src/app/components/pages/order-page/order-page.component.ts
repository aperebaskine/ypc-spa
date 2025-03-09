import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { AddressService } from '../../../services/address.service';
import { Address, OrderLine } from '../../../generated';
import { map, reduce, tap } from 'rxjs';
import { AddressCardComponent } from "../../common/address/address-card/address-card.component";
import { Cart } from '../../../model/cart';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-page',
  imports: [
    CommonModule,
    AddressCardComponent,
    MatStepperModule,
    MatButtonModule
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss'
})
export class OrderPageComponent {

  orderLines?: OrderLine[];
  addresses?: Address[];

  billingAddress?: Address;
  shippingAddress?: Address;

  success = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private addressService: AddressService,
    private orderService: OrderService
  ) {

    this.addressService.findAll()
      .pipe(
        tap((addresses) =>
          this.billingAddress = addresses.filter((a) => a.billing).pop()
        ),
        tap((addresses) =>
          this.shippingAddress = addresses.filter((a) => a.default).pop()
        )
      ).subscribe(
        (addresses) => this.addresses = addresses
      );

    this.cartService.cart
      .pipe(map(
        (cart: Cart) => cart.products.map((cartItem) => {
          return {
            productId: cartItem.id,
            quantity: cartItem.qty,
            salePrice: cartItem.salePrice
          } as OrderLine
        })
      ))
      .subscribe(
        (orderLines) => this.orderLines = orderLines
      );
  }

  placeOrder() {
    this.orderService.placeOrder(
      this.billingAddress!.id!, 
      this.shippingAddress!.id!, 
      this.orderLines!
    ).subscribe(
      (order) => this.success = !!order
    );
  }

}
