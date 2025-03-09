import { Injectable } from '@angular/core';
import { DefaultService } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private defaultService: DefaultService) {
  }

  findAll() {
    return this.defaultService.findAllAddresses();
  }
}
