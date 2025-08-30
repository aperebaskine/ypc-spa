import { Component, Input, SimpleChanges } from '@angular/core';
import { OrderLine, Product } from '../../../generated';
import { ProductService } from '../../../services/product.service';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-line',
  imports: [MatListModule, RouterModule, CurrencyPipe],
  templateUrl: './order-line.component.html',
  styleUrl: './order-line.component.scss'
})
export class OrderLineComponent {

  @Input() orderLine?: OrderLine;
  productImageUrl?: string = "images/unknown-image.png";

  constructor(
    private productService: ProductService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orderLine']) {
      this.productService.findImage(this.orderLine!.productId!).subscribe((url) => this.productImageUrl = url);
    }
  }

}
