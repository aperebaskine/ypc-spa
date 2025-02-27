import { Injectable } from '@angular/core';
import { DefaultService, LightAttribute } from '../generated';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private defaultService: DefaultService) { }

  findById(id: number) {
    return this.defaultService.findProductById('en-GB', id);
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
      attributes?: LightAttribute[];
    }
  ) {
    return this.defaultService.findProductBy(
      'en-GB',
      { pos, pageSize, ...filters }
    );
  }
}
