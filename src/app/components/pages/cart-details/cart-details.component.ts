import { Component, SimpleChanges } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../model/cart';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CartListItemComponent } from "../../common/cart-list-item/cart-list-item.component";

@Component({
  selector: 'app-cart-details',
  imports: [CommonModule, MatListModule, MatButtonModule, CartListItemComponent],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.scss'
})
export class CartDetailsComponent {

  cart?: Cart;

  constructor(
    private cartService: CartService) {
    this.cartService.cart.subscribe((cart) => this.cart = cart);
  }

  calcSubtotal() {
    return this.cart!.products
      .map((item) => item.salePrice * item.qty)
      .reduce((prev, current) => prev + current);
  }

}
