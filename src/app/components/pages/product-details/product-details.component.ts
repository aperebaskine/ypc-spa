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
import { map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, MatInputModule, MatButtonModule, MatIconModule, FormatAttributeValuesPipe, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {

  product?: Product;
  imgSrc?: string = 'images/unknown-image.png';
  attributeValues?: string[];

  cartQty = new FormControl(1);

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    this.productService
      .findById(this.route.snapshot.params['id'])
      .pipe(
        tap((product) => this.product = product),
        map((product) => product.id),
        switchMap((id) => this.productService.findImage(id)))
      .subscribe(
        (imgSrc) => this.imgSrc = imgSrc
      );

  }

  addToCart(event: SubmitEvent) {
    event.preventDefault();

    this.cartService.addItem({ id: this.product!.id, qty: this.cartQty.value!, salePrice: this.product!.salePrice, name: this.product!.name });
  }

}
