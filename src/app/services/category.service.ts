import { Inject, Injectable, LOCALE_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDTO, DefaultService } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private defaultService: DefaultService,
    @Inject(LOCALE_ID) private locale: string) {
  }

  findAll() {
    return this.defaultService.findAllCategories(this.locale);
  }
}
