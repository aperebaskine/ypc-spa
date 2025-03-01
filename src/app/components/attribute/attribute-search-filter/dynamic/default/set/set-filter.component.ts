import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseFilterComponent } from '../../base/base-filter.component';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';

@Component({
  selector: 'app-set-filter',
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './set-filter.component.html',
  styleUrl: './set-filter.component.scss',
})
export class SetFilterComponent extends BaseFilterComponent<any> {
  checked: string[] = [];

  handleChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.checked.push(event.source.value);
    } else {
      const i = this.checked.indexOf(event.source.value);
      if (i > -1) {
        this.checked.splice(i, 1);
      }
    }

    this.valueEmitter?.emit(this.checked);
  }
}

export default SetFilterComponent;
