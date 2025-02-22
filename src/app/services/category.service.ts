import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDTO, DefaultService } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private defaultService: DefaultService) {
  }

  findAll(locale: string) {
    return this.defaultService.findAllCategories(locale);
  }
}
