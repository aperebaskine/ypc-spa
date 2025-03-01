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
export class RangeFilterComponent extends BaseFilterComponent<any> {
  step?: number;

  minValue?: number;
  maxValue?: number;

  startValue?: number;
  endValue?: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['attribute']) {
      this.step = this.calculateStep();

      this.minValue = this.calculateMinValue();
      this.maxValue = this.calculateMaxValue();

      this.startValue = this.minValue;
      this.endValue = this.maxValue;
    }
  }

  calculateStep() {

    let startValue = this.attribute!.values[0].value as number;

    if (startValue > 1000000) {
      return 100000;
    }

    if (startValue > 1000) {
      return 100;
    }

    if (startValue != Math.trunc(startValue)) {
      return 0.01;
    }

    return 1;
  }

  calculateMinValue() {
    let minValue = this.attribute?.values[0].value as number;
    return minValue - (minValue % this.step!);
  }

  calculateMaxValue() {
    let maxValue = this.attribute!.values[this.attribute!.values.length - 1].value as number;
    return maxValue % this.step! < 0.00001 ? maxValue : maxValue + this.step! - (maxValue % this.step!);
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
