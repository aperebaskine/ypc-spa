import { Component, OnInit } from '@angular/core';
import { Address } from '../../../generated';
import { CommonModule } from '@angular/common';
import { AddressCardComponent } from "../../common/address/address-card/address-card.component";
import { AddressService } from '../../../services/address.service';
import { MatButtonModule } from '@angular/material/button';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard-addresses',
  imports: [CommonModule, AddressCardComponent, MatButtonModule],
  templateUrl: './dashboard-addresses.component.html',
  styleUrl: './dashboard-addresses.component.scss'
})
export class DashboardAddressesComponent implements OnInit {

  addresses!: Observable<Address[]>;

  constructor(private addressService: AddressService) {
    this.addresses = this.addressService.getAddresses();
  }

  ngOnInit() {
    
  }

}
