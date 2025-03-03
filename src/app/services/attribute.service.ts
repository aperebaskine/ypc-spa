import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DefaultService } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private defaultService: DefaultService,
    @Inject(LOCALE_ID) private locale: string) {
  }

  findById(id: number, unassignedValues: boolean = false, categoryId?: number) {
    return this.defaultService.findAttributeById(this.locale, id, categoryId, unassignedValues);
  }

  findByName(name: string, unassignedValues: boolean = false, categoryId?: number) {
    return this.defaultService.findAttributeByName(this.locale, name, categoryId, unassignedValues);
  }

  findByCategory(categoryId: number, unassignedValues: boolean = false) {
    return this.defaultService.findAttributeByCategory(this.locale, categoryId, unassignedValues);
  }

}
