import { Component, Input } from '@angular/core';
import { Address } from '../../../../generated';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AddressEditorComponent } from "../../../address/address-editor/address-editor.component";

@Component({
  selector: 'app-address-card',
  imports: [CommonModule, MatCardModule, AddressEditorComponent],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss'
})
export class AddressCardComponent {

  @Input() address?: Address;
  @Input() actions: ('select' | 'edit' | 'delete')[] = ['edit', 'delete'];

}
