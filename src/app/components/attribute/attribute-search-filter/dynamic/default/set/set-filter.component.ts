import { Component } from '@angular/core';
import { BaseFilterComponent } from '../../base/base-filter.component';

@Component({
  selector: 'app-set-filter',
  imports: [],
  templateUrl: './set-filter.component.html',
  styleUrl: './set-filter.component.css'
})
export class SetFilterComponent extends BaseFilterComponent<any> {

}

export default SetFilterComponent;