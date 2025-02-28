import { Component, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseFilterComponent } from '../../base/base-filter.component';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-range-filter',
  imports: [CommonModule, MatSliderModule],
  templateUrl: './range-filter.component.html',
  styleUrl: './range-filter.component.scss',
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

  calculateStep() {
    if (this.startValue! > 1000000) {
      return 100000;
    }

    if (this.startValue! > 1000) {
      return 100;
    }

    if (this.startValue != Math.trunc(this.startValue!)) {
      return 0.01;
    }

    return 1;
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
    if (this.startValue === this.minValue && this.endValue === this.maxValue) {
      this.valueEmitter?.emit([]);
    } else {
      this.valueEmitter?.emit([this.startValue!, this.endValue!]);
    }

  }
}

export default RangeFilterComponent;
