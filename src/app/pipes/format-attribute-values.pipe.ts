import { Pipe, PipeTransform } from '@angular/core';
import { Attribute } from '../generated';

@Pipe({
  name: 'formatAttributeValues'
})
export class FormatAttributeValuesPipe implements PipeTransform {

  // TODO: Implement a strategy pattern
  formattedBooleanValues: Record<string, string> = {
    "true": $localize`Yes`,
    "false": $localize`No`
  }

  transform(attribute: Attribute): string {
    return attribute.values
      .map(attribute.dataType === "boolean" ?
        (v) => this.formattedBooleanValues[v.value!.toString()] :
        (v) => v.value)
      .join(", ");
  }

}
