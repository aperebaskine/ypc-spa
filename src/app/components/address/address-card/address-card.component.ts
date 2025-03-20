import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../../generated';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AddressService } from '../../../services/address.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddressFormComponent } from '../../address/address-form/address-form.component';
import { map } from 'rxjs';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-address-card',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule],
  standalone: true,
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss',
})
export class AddressCardComponent {

  @Input() address?: Address;
  @Output() addressChange = new EventEmitter<Address>();

  addressCount?: number;
  @Input() actions: ('edit' | 'delete')[] = ['edit', 'delete'];

  constructor(
    private addressService: AddressService,
    private dialog: MatDialog
  ) {
    this.addressService.getAddresses()
          .pipe(map((addresses) => addresses.length))
          .subscribe((addressCount) => this.addressCount = addressCount);
  }

  edit() {
    const dialog = this.dialog.open(AddressFormComponent, {
      disableClose: true,
      data: { address: this.address, addressCount: this.addressCount },
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
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: $localize`Delete address`,
        message: $localize`Do you really want to delete this address?`,
      },
    });

    dialog.beforeClosed().subscribe((del: boolean) => {
      if (del) {
        this.addressService.delete(this.address!.id!).subscribe();
      }
    });
  }
}
