import { Component, EventEmitter, Input } from '@angular/core';
import { Attribute } from '../../../../../generated';

@Component({
  selector: 'app-base-filter',
  imports: [],
  template: ``
})
export abstract class BaseFilterComponent<T> {
  @Input() attribute?: Attribute;
  @Input() valueEmitter?: EventEmitter<T>;
}
