import { Injectable } from '@angular/core';
import { DefaultService } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor(private defaultService: DefaultService) { }

  findAll() {
    return this.defaultService.findAllDoctypes();
  }
  
}
