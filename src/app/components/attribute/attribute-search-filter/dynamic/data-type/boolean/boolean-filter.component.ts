import { Component } from '@angular/core';
import { BaseFilterComponent } from '../../base/base-filter.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-boolean-filter',
  imports: [MatSlideToggleModule],
  templateUrl: './boolean-filter.component.html',
  styleUrl: './boolean-filter.component.css',
})
export class BooleanFilterComponent extends BaseFilterComponent<boolean> {
  handleToggle(value: boolean) {
    this.valueEmitter?.emit([value]);
  }
}

export default BooleanFilterComponent;
