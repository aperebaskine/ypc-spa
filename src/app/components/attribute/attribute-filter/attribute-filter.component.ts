import { Component, Inject } from '@angular/core';
import { Attribute } from '../../../generated';

@Component({
  selector: 'app-attribute-filter',
  imports: [],
  templateUrl: './attribute-filter.component.html',
  styleUrl: './attribute-filter.component.css'
})
export class AttributeFilterComponent {

  private static types = new Map<String, any>();

  private attribute?: Attribute;


  private constructor() { }

  public static of(attribute: Attribute) {
    let type: any = Promise.resolve(AttributeFilterComponent.resolveTemplate(attribute));
    return new type.default(attribute);
  }

  private static async resolveTemplate(attribute: Attribute): Promise<any> {

    let type: any = AttributeFilterComponent.types.get(attribute.dataType!);

    if (type) {
      return type;
    }

    try {
      type = await import(`./data-type/${attribute.dataType}/${attribute.dataType}.component.js`);
    } catch (e) {
      try {
        type = await import(`./handling-mode/${attribute.handlingMode}/${attribute.handlingMode}.component.js`);
      } catch (e) {
        throw new Error(`No component defined for attribute of data type 
          ${attribute.dataType} or handling mode ${attribute.handlingMode}`);
      }
    }

    AttributeFilterComponent.types.set(attribute.dataType!, type);

    return type;
  }

}
