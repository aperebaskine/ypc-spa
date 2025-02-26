import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  Type,
} from '@angular/core';
import { Attribute, LightAttribute } from '../../../generated';
import { BaseFilterComponent } from './dynamic/base/base-filter.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attribute-search-filter',
  imports: [CommonModule],
  templateUrl: './attribute-search-filter.component.html',
  styleUrl: './attribute-search-filter.component.css',
})
export class AttributeSearchFilterComponent {
  private static types = new Map<string, Type<BaseFilterComponent<any>>>();

  @Input() attribute?: Attribute;
  @Output() attributeChange = new EventEmitter<LightAttribute>();

  outlet?: Type<BaseFilterComponent<any>>;

  // TODO: Use a cleaner approach for communication between the static and dynamic components
  valueEmitter = new EventEmitter<any>();

  public constructor() {
    this.valueEmitter.subscribe((v) => {
      this.attributeChange.emit({ id: this.attribute!.id, values: v });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['attribute']) {
      this.resolveComponent(changes['attribute'].currentValue).then(
        (type) => (this.outlet = type)
      );
    }
  }

  async resolveComponent(
    attribute: Attribute
  ): Promise<Type<BaseFilterComponent<any>>> {
    let component = AttributeSearchFilterComponent.types.get(
      attribute.dataType
    );

    if (!component) {
      try {
        component = await resolveForDataType(attribute.dataType);
      } catch (e) {
        component = await resolveDefault(attribute.handlingMode);
      }

      AttributeSearchFilterComponent.types.set(attribute.dataType, component!);
    }

    return component!;

    async function resolveForDataType(dataType: string) {
      return await import(
        `./dynamic/data-type/${dataType}/${dataType}-filter.component.ts`
      ).then((type) => type.default);
    }

    async function resolveDefault(handlingMode: string) {
      return await import(
        `./dynamic/default/${handlingMode}/${handlingMode}-filter.component.ts`
      ).then((type) => type.default);
    }
  }
}
