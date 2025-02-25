import { Component } from '@angular/core';
import { BaseFilterComponent } from '../../base/base-filter.component';

@Component({
  selector: 'app-boolean-filter',
  imports: [],
  templateUrl: './boolean-filter.component.html',
  styleUrl: './boolean-filter.component.css'
})
export class BooleanFilterComponent extends BaseFilterComponent<Boolean> {

}

export default BooleanFilterComponent;