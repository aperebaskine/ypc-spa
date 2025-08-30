import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { CustomerOrder } from '../../../generated';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { OrderPanelComponent } from "../../order/order-panel/order-panel.component";
import { LoadingComponent } from "../../common/loading/loading.component";

@Component({
  selector: 'app-dashboard-orders',
  imports: [CommonModule, MatButtonModule, OrderPanelComponent, LoadingComponent],
  templateUrl: './dashboard-orders.component.html',
  styleUrl: './dashboard-orders.component.scss'
})
export class DashboardOrdersComponent {

  loading: boolean = true;
  orders?: CustomerOrder[];

  constructor(private orderService: OrderService) {
    this.loading = true;
    this.orderService.findAll().subscribe((orders) => {
      this.orders = orders;
      this.loading = false;
    });
  }

}
