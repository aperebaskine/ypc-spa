import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderState'
})
export class OrderStatePipe implements PipeTransform {

  orderStates: Record<string, string> = {
    "CAN": $localize`Cancelled`,
    "DEL": $localize`Delivered`,
    "PND": $localize`Pending`,
    "PRS": $localize`Processing`,
    "SPD": $localize`Shipped`,
  };

  transform(value: string | undefined): unknown {
    return value ? this.orderStates[value] : "";
  }

}
