import { Injectable } from '@angular/core';
import { IdentityService as IdentityApi } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor(private identityApi: IdentityApi) { }

  findAll() {
    return this.identityApi.findAllDoctypes();
  }
  
}
