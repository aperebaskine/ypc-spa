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
  styleUrl: './set-filter.component.css',
})
export class SetFilterComponent extends BaseFilterComponent<any> {
  checked = new Set<String>();

  handleChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.checked.add(event.source.value);
    } else {
      this.checked.delete(event.source.value);
    }

    this.values?.emit([...this.checked]);
  }
}

export default SetFilterComponent;
