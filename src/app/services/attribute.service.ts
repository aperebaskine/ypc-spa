import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ProductService as ProductApi } from '../generated';

@Injectable({
  providedIn: 'root',
})
export class AttributeService {
  constructor(
    private productApi: ProductApi,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  findById(id: number, unassignedValues: boolean = false, categoryId?: number) {
    return this.productApi.findAttributeById(
      this.locale,
      id,
      categoryId,
      unassignedValues
    );
  }

  findByName(
    name: string,
    unassignedValues: boolean = false,
    categoryId?: number
  ) {
    return this.productApi.findAttributeByName(
      this.locale,
      name,
      categoryId,
      unassignedValues
    );
  }

  findByCategory(categoryId: number, unassignedValues: boolean = false) {
    return this.productApi.findAttributeByCategory(
      this.locale,
      categoryId,
      unassignedValues
    );
  }
}
