import { Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../../../generated';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, RouterModule, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product?: Product;

  src?: string = "images/unknown-image.png";

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
  }

  addToCart() {
    this.cartService.addItem({ id: this.product!.id, qty: 1, salePrice: this.product!.salePrice, name: this.product!.name });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']?.currentValue) {
      this.productService.findImage(changes['product'].currentValue.id).subscribe((src) => this.src = src);
    }
  }
}
