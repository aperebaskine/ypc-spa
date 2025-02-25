import { Component } from '@angular/core';
import { BaseFilterComponent } from '../../base/base-filter.component';

@Component({
  selector: 'app-range-filter',
  imports: [],
  templateUrl: './range-filter.component.html',
  styleUrl: './range-filter.component.css'
})
export class RangeFilterComponent extends BaseFilterComponent<any> {

}

export default RangeFilterComponent;