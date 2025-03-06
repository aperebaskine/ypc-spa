import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../generated';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormatAttributeValuesPipe } from '../../../pipes/format-attribute-values.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, MatInputModule, MatButtonModule, MatIconModule, FormatAttributeValuesPipe, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product?: Product;
  attributeValues?: string[];

  cartQty = new FormControl(1);

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    this.productService
      .findById(this.route.snapshot.params['id'])
      .subscribe((product) => (this.product = product));
  }

  addToCart(event: SubmitEvent) {
    event.preventDefault();

    this.cartService.addItem(this.product!.id, this.cartQty.value!, this.product!.salePrice);
  }
}
