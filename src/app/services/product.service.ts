import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DefaultService } from '../generated';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private defaultService: DefaultService,
    @Inject(LOCALE_ID) private locale: string) {
  }

  findById(id: number) {
    return this.defaultService.findProductById(this.locale, id);
  }

  findBy(
    pos: number,
    pageSize: number,
    filters: {
      name?: string;
      launchDateFrom?: string;
      launchDateTo?: string;
      hasStock?: boolean;
      priceMin?: number;
      priceMax?: number;
      categoryId?: number;
      attributes?: any[];
    }
  ) {
    return this.defaultService.findProductBy(
      this.locale,
      pos,
      pageSize,
      filters.name,
      filters.launchDateFrom,
      filters.launchDateTo,
      filters.hasStock === undefined ? undefined : Number(filters.hasStock),
      undefined,
      filters.priceMin,
      filters.priceMax,
      filters.categoryId,
      btoa(JSON.stringify(filters.attributes))
    );
  }
}
