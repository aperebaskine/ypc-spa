import { Inject, Injectable, LOCALE_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDTO, ProductService as ProductApi } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private productApi: ProductApi,
    @Inject(LOCALE_ID) private locale: string) {
  }

  findAll() {
    return this.productApi.findAllCategories(this.locale);
  }
}
