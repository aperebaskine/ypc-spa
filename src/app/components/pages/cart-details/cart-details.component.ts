import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../model/cart';

@Component({
  selector: 'app-cart-details',
  imports: [],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.scss'
})
export class CartDetailsComponent {

  cart?: Cart;

  constructor(
    private productService: ProductService,
    private cartService: CartService) {
    this.cartService.subscribe((cart) => this.cart = cart);
  }

  getProduct(id: number) {
    return this.productService.findById(id);
  }

}
