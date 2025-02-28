import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../generated';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormatAttributeValuesPipe } from '../../../pipes/format-attribute-values.pipe';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, FormatAttributeValuesPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product?: Product;
  attributeValues?: string[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.productService
      .findById(this.route.snapshot.params['id'])
      .subscribe((product) => (this.product = product));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      this.formatAttributeValues();
    }
  }

  formatAttributeValues() {
    let res = [];

    for (let attribute of this.product!.attributes) {
      res.push(attribute.values.map((v) => v.value).join(", "));
    }
  }
}
