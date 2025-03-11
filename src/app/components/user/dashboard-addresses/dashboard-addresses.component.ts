import { Component } from '@angular/core';
import { Address } from '../../../generated';
import { CommonModule } from '@angular/common';
import { AddressCardComponent } from "../../common/address/address-card/address-card.component";
import { AddressService } from '../../../services/address.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-addresses',
  imports: [CommonModule, AddressCardComponent, MatButtonModule],
  templateUrl: './dashboard-addresses.component.html',
  styleUrl: './dashboard-addresses.component.scss'
})
export class DashboardAddressesComponent {

  addresses!: Address[];

  constructor(private defaultService: AddressService) { 
    this.defaultService.findAll().subscribe((addresses) => this.addresses = addresses);
  }

}
