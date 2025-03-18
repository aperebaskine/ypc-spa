import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Address } from '../../../generated';
import { AddressCardComponent } from '../../common/address/address-card/address-card.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddressSelectorDialogComponent } from '../address-selector-dialog/address-selector-dialog.component';

@Component({
  selector: 'app-address-selector',
  imports: [CommonModule, MatButtonModule, AddressCardComponent],
  templateUrl: './address-selector.component.html',
  styleUrl: './address-selector.component.scss'
})
export class AddressSelectorComponent {

  @Input() address: Address | undefined;
  @Output() addressChange = new EventEmitter<Address | undefined>();

  constructor(private dialog: MatDialog) {

  }

  openDialog() {
    const dialog = this.dialog.open(AddressSelectorDialogComponent);

    dialog.beforeClosed().subscribe((address) => {
      if (address) {
        this.address = address;
      }
    });
  }

}
