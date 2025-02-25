import { Component, EventEmitter, Input } from '@angular/core';
import { Attribute } from '../../../../../generated';

@Component({
  selector: 'app-base-filter',
  imports: [],
  templateUrl: './base-filter.component.html',
  styleUrl: './base-filter.component.css'
})
export abstract class BaseFilterComponent<T> {

  @Input() attribute?: Attribute;
  @Input() values?: EventEmitter<T[]>;

}
