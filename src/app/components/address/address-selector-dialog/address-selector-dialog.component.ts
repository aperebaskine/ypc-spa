import { Component } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { Address } from '../../../generated';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AddressCardComponent } from '../../common/address/address-card/address-card.component';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-address-selector-dialog',
  imports: [CommonModule, MatButtonModule, AddressCardComponent],
  templateUrl: './address-selector-dialog.component.html',
  styleUrl: './address-selector-dialog.component.scss',
})
export class AddressSelectorDialogComponent {
  addresses!: Observable<Address[]>;

  constructor(
    private addressService: AddressService,
    private dialogRef: MatDialogRef<AddressSelectorDialogComponent>
  ) {
    this.addresses = this.addressService.addresses;
  }

  addressSelected(address: Address) {
    this.dialogRef.close(address);
  }
}
