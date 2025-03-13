import { Component, Input } from '@angular/core';
import { Address } from '../../../generated';
import { CommonModule } from '@angular/common';
import { AddressService } from '../../../services/address.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddressFormComponent } from '../address-form/address-form.component';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-address-editor',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './address-editor.component.html',
  styleUrl: './address-editor.component.scss',
})
export class AddressEditorComponent {

  addressCount!: number;

  constructor(
    private addressService: AddressService,
    private dialog: MatDialog
  ) {
    this.addressService.getAddresses()
      .pipe(map((addresses) => addresses.length))
      .subscribe((addressCount) => this.addressCount = addressCount);
  }

  @Input() address?: Address;

  edit() {
    const dialog = this.dialog.open(AddressFormComponent, {
      disableClose: true,
      data: { address: this.address, addressCount: this.addressCount }
    });

    dialog.beforeClosed().subscribe((address: Address) => {

      if (!address) {
        return;
      }

      if (address.id) {
        this.addressService.update(address).subscribe();
      } else {
        this.addressService.create(address).subscribe();
      }
    });
  }

  delete() {
    const dialog = this.dialog.open(
      ConfirmDialogComponent, {
      data: {
        title: $localize`Delete address`,
        message: $localize`Do you really want to delete this address?`
      }
    });

    dialog.beforeClosed().subscribe((del: boolean) => {
      if (del) {
        this.addressService.delete(this.address!.id!).subscribe();
      }
    });
  }

}
