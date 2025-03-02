import { Component, Input } from '@angular/core';
import { Product } from '../../../generated';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, RouterModule, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product?: Product;

  addToCart(event: Event) {
  }
}
