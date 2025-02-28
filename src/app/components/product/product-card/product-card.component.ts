import { Component, Input } from '@angular/core';
import { Product } from '../../../generated';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product?: Product;

}
