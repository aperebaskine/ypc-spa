import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../../generated';
import { AddressService } from '../../../services/address.service';
import { AddressEditorComponent } from "../address-editor/address-editor.component";
import { AddressCardComponent } from "../../common/address/address-card/address-card.component";

@Component({
  selector: 'app-address-selector',
  imports: [AddressEditorComponent, AddressCardComponent],
  templateUrl: './address-selector.component.html',
  styleUrl: './address-selector.component.scss'
})
export class AddressSelectorComponent {

  @Input() address: Address | undefined;
  @Output() addressChange = new EventEmitter<Address>;

}
