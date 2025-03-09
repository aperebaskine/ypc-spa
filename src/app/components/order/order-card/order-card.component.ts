import { Component, Input } from '@angular/core';
import { CustomerOrder } from '../../../generated';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-order-card',
  imports: [CommonModule, MatCardModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {

  @Input() order?: CustomerOrder;

}
