import { Component, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseFilterComponent } from '../../base/base-filter.component';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-range-filter',
  imports: [CommonModule, MatSliderModule],
  templateUrl: './range-filter.component.html',
  styleUrl: './range-filter.component.css',
})
export class RangeFilterComponent extends BaseFilterComponent<number> {
  minValue?: number;
  maxValue?: number;

  startValue?: number;
  endValue?: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['attribute']) {
      let attribute = changes['attribute'].currentValue;

      this.minValue = attribute.values[0].value;
      this.maxValue = attribute.values[attribute.values.length - 1].value;

      this.startValue = this.minValue;
      this.endValue = this.maxValue;
    }
  }

  formatLabel(value: number) {
    if (value > 999999) {
      return `${(value / 1000000).toFixed(1)}M`;
    }

    if (value > 999) {
      return `${(value / 1000).toFixed(1)}K`;
    }

    return value.toString();
  }

  handleValueChange() {
    this.values?.emit([this.startValue!, this.endValue!]);
  }
}

export default RangeFilterComponent;
