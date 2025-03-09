import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { CustomerOrder } from '../../../generated';
import { OrderCardComponent } from "../../order/order-card/order-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-orders',
  imports: [CommonModule, OrderCardComponent],
  templateUrl: './dashboard-orders.component.html',
  styleUrl: './dashboard-orders.component.scss'
})
export class DashboardOrdersComponent {

  orders?: CustomerOrder[];

  constructor(private orderService: OrderService) {
    this.orderService.findAll().subscribe((orders) => this.orders = orders);
  }

}
