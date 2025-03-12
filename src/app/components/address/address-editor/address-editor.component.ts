import { Component, Input } from '@angular/core';
import { Address } from '../../../generated';
import { CommonModule } from '@angular/common';
import { AddressService } from '../../../services/address.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-address-editor',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './address-editor.component.html',
  styleUrl: './address-editor.component.scss',
})
export class AddressEditorComponent {
  constructor(
    private addressService: AddressService,
    private dialog: MatDialog
  ) { }

  @Input() address?: Address;

  edit() {
    const dialog = this.dialog.open(AddressFormComponent, {
      disableClose: true,
      data: { address: this.address }
    });
  }

  delete() { }
  
}
