import { Component, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { DashboardAddressesComponent } from '../../dashboard/dashboard-addresses/dashboard-addresses.component';
import { UserService } from '../../../services/user.service';
import { DashboardOrdersComponent } from '../../dashboard/dashboard-orders/dashboard-orders.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-dashboard',
  imports: [CommonModule, MatSidenavModule, MatButtonModule, RouterModule],
  templateUrl: './account-dashboard.component.html',
  styleUrl: './account-dashboard.component.scss'
})
export class AccountDashboardComponent {

  constructor() {
  }

}
