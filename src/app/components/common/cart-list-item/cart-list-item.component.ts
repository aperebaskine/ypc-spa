import { Component, Input, SimpleChanges } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ProductService } from '../../../services/product.service';
import { CartItem } from '../../../model/cartItem';
import { Product } from '../../../generated';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-list-item',
  imports: [CommonModule, RouterModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './cart-list-item.component.html',
  styleUrl: './cart-list-item.component.scss'
})
export class CartListItemComponent {

  @Input() item?: CartItem;
  productData?: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item']) {
      this.productService
        .findById(this.item!.id)
        .subscribe((product) => this.productData = product);
    }
  }

  incr(offset: number) {
    this.cartService.modifyItem(this.item!.id, this.item!.qty + offset);
  }

  remove() {
    this.cartService.removeItem(this.item!.id);
  }

}
