import { Injectable } from '@angular/core';
import { Address, DefaultService } from '../generated';
import { BehaviorSubject, take, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {

  private readonly addressesSubject = new BehaviorSubject<Address[]>([]);

  constructor(
    private defaultService: DefaultService,
    private userService: UserService
  ) {
    this.userService.user.subscribe((user) => {
      if (user == null) {
        this.addressesSubject.next([]);
      } else {
        this.updateAddresses();
      }
    });
  }

  getAddresses() {
    return this.addressesSubject.asObservable();
  }

  updateAddresses() {
    this.defaultService
      .findAllAddresses()
      .subscribe((addresses) => this.addressesSubject.next(addresses));
  }

  create(address: Address) {
    return this.defaultService
      .createAddress(
        address.streetName!,
        address.zipCode!,
        address.cityId!,
        address.isDefault ?? false,
        address.isBilling ?? false,
        address.streetNumber ?? undefined,
        address.floor ?? undefined,
        address.door ?? undefined
      ).pipe(
        tap(() => this.updateAddresses())
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
        address.streetNumber ?? undefined,
        address.floor ?? undefined,
        address.door ?? undefined
      ).pipe(
        tap(() => this.updateAddresses())
      );
  }

  delete(id: number) {
    return this.defaultService
      .deleteAddressById(id)
      .pipe(
        tap(() => this.updateAddresses())
      );
  }
}
