import { Injectable, inject } from '@angular/core';
import { DefaultService } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  defaultService: DefaultService = inject(DefaultService);

  findAll() {
    return this.defaultService.findAllCategories("en-GB");
  }
}
