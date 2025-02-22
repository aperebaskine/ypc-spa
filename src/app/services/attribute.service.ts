import { Injectable } from '@angular/core';
import { DefaultService } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private defaultService: DefaultService) { }

  findById(id: number, locale: string, unassignedValues: boolean = false, categoryId?: number) {
    return this.defaultService.findAttributeById(locale, id, categoryId, unassignedValues);
    }

  findByName(name: string, locale: string, unassignedValues: boolean = false, categoryId?: number) {
    return this.defaultService.findAttributeByName(locale, name, categoryId, unassignedValues);
  }

  findByCategory(categoryId: number, locale: string, unassignedValues: boolean = false) {
    return this.defaultService.findAttributeByCategory(locale, categoryId, unassignedValues);
  }

}
