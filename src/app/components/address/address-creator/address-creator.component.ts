import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AddressFormDialogComponent } from '../../dialogs/address-form-dialog/address-form-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddressService } from '../../../services/address.service';
import { Address } from '../../../generated';

@Component({
  selector: 'app-address-creator',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './address-creator.component.html',
  styleUrl: './address-creator.component.scss',
})
export class AddressCreatorComponent {
  constructor(
    private addressService: AddressService,
    private dialog: MatDialog
  ) {}

  open() {
    const dialog = this.dialog.open(AddressFormDialogComponent, { data: {} });

    dialog.beforeClosed().subscribe((address?: Address) => {
      if (address) {
        this.addressService.create(address).subscribe();
      }
    });
  }
}
