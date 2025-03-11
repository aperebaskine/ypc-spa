import { Injectable } from '@angular/core';
import { Address, DefaultService } from '../generated';
import { UserService } from './user.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(
    private defaultService: DefaultService
  ) {}

  findAll() {
    return this.defaultService.findAllAddresses();
  }

  create(address: Address) {
    return this.defaultService
      .createAddress(
        address.streetName!,
        address.zipCode!,
        address.cityId!,
        address.isDefault ?? false,
        address.isBilling ?? false,
        address.streetNumber,
        address.floor,
        address.door
      );
  }

  update(address: Address) {
    return this.defaultService
      .updateAddress(
        address.id!,
        address.streetName!,
        address.zipCode!,
        address.cityId!,
        address.isDefault ?? false,
        address.isBilling ?? false,
        address.streetNumber,
        address.floor,
        address.door
      );
  }
}
