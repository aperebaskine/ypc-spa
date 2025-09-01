import { Component, inject, Input, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddressFormComponent } from '../../address/address-form/address-form.component';
import { Address } from '../../../generated';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-address-form-dialog',
  imports: [MatDialogModule, MatButtonModule, AddressFormComponent],
  templateUrl: './address-form-dialog.component.html',
  styleUrl: './address-form-dialog.component.scss',
})
export class AddressFormDialogComponent {
  @ViewChild(AddressFormComponent) form!: AddressFormComponent;
  @Input() address?: Address = inject(MAT_DIALOG_DATA).address;

  constructor(
    private dialogRef: MatDialogRef<AddressFormDialogComponent>,
  ) {}

  cancel() {
    this.dialogRef.close();
  }

  onSubmit(address: Address) {
    this.dialogRef.close(address);
  }
}
