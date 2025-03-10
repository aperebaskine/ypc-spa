import { Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../../../generated';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, RouterModule, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product?: Product;

  src?: string;

  constructor(private cartService: CartService) {
   }

  addToCart() {
    this.cartService.addItem({ id: this.product!.id, qty: 1, salePrice: this.product!.salePrice, name: this.product!.name });
  }

  setDefaultImage() {
    this.src = "/images/unknown-image.png";
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.product) {
      this.src = `/images/product/${this.product.id}.webp`;
    }
  }
}
