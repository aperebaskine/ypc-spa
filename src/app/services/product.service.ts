import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DefaultService } from '../generated';
import { map } from 'rxjs';

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
      name?: string,
      launchDateFrom?: string,
      launchDateTo?: string,
      hasStock?: boolean,
      priceMin?: number,
      priceMax?: number,
      categoryId?: number,
      attributes?: any[],
      orderBy?: string,
      ascDesc?: 'asc' | 'desc'
    }
  ) {
    return this.defaultService.findProductBy(
      this.locale,
      pos,
      pageSize,
      filters.name ?? undefined,
      filters.launchDateFrom ?? undefined,
      filters.launchDateTo ?? undefined,
      filters.hasStock === undefined ? undefined : Number(filters.hasStock),
      undefined,
      filters.priceMin ?? undefined,
      filters.priceMax ?? undefined,
      filters.categoryId ?? undefined,
      (filters.attributes ? btoa(JSON.stringify(filters.attributes)) : undefined),
      filters.orderBy ?? undefined,
      filters.ascDesc ?? undefined
    );
  }

  findImage(id: number) {
    return this.defaultService
      .findProductImageById(id)
      .pipe(
        map(
          (image) => URL.createObjectURL(image)
        )
      );
  }
}
