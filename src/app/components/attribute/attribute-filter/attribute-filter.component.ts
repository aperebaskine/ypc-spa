import { Component, Input } from '@angular/core';
import { Attribute } from '../../../generated';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-attribute-filter',
  imports: [MatDivider],
  templateUrl: './attribute-filter.component.html',
  styleUrl: './attribute-filter.component.css'
})
export class AttributeFilterComponent {

  @Input() attribute?: Attribute;

}
