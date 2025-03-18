import { Component } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { Address } from '../../../generated';
import { Observable } from 'rxjs';
import { AddressCardComponent } from '../../common/address/address-card/address-card.component';

@Component({
  selector: 'app-address-selector-dialog',
  imports: [AddressCardComponent],
  templateUrl: './address-selector-dialog.component.html',
  styleUrl: './address-selector-dialog.component.scss'
})
export class AddressSelectorDialogComponent {

  addresses?: Observable<Address[]>;

  constructor(private addressService: AddressService) {
    this.addresses = this.addressService.getAddresses();
  }

}
