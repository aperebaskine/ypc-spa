import { Component } from '@angular/core';
import { BaseFilterComponent } from '../../base/base-filter.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boolean-filter',
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './boolean-filter.component.html',
  styleUrl: './boolean-filter.component.scss',
})
export class BooleanFilterComponent extends BaseFilterComponent<boolean> {
  handleToggle(value: boolean) {
    this.valueEmitter?.emit([value]);
  }
}

export default BooleanFilterComponent;
