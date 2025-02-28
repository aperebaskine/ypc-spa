import { Pipe, PipeTransform } from '@angular/core';
import { Attribute } from '../generated';

@Pipe({
  name: 'formatAttributeValues'
})
export class FormatAttributeValuesPipe implements PipeTransform {

  transform(value: Attribute): string {
    return value.values.map((v) => v.value).join(", ");
  }

}
