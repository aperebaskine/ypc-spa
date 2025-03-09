import { Component, Input } from '@angular/core';
import { Address } from '../../../../generated';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-card',
  imports: [CommonModule, MatCardModule],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss'
})
export class AddressCardComponent {

  @Input() address?: Address;

}
