import { Injectable } from '@angular/core';
import { Address, MeService as MeApi } from '../generated';
import { BehaviorSubject, map, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly addressesSubject = new BehaviorSubject<Address[]>([]);
  public readonly addresses = this.addressesSubject.asObservable();

  constructor(private meApi: MeApi, private userService: UserService) {
    this.userService.user.subscribe((user) => {
      if (user == null) {
        this.addressesSubject.next([]);
      } else {
        this.updateAddresses();
      }
    });
  }

  getAddresses() {
    return this.addressesSubject
      .asObservable()
      .pipe(
        map((addresses) =>
          addresses.sort((a, b) =>
            a.isDefault === b.isDefault
              ? +b.isBilling! - +a.isBilling!
              : +b.isDefault! - +a.isDefault!
          )
        )
      );
  }

  updateAddresses() {
    this.meApi
      .getMyAddresses()
      .subscribe((addresses) => this.addressesSubject.next(addresses ?? []));
  }

  create(address: Address) {
    return this.meApi
      .createMyAddress(
        address.name,
        address.streetName,
        address.zipCode,
        address.cityId,
        address.isDefault ?? false,
        address.isBilling ?? false,
        address.streetNumber ?? undefined,
        address.floor ?? undefined,
        address.door ?? undefined
      )
      .pipe(tap(() => this.updateAddresses()));
  }

  update(address: Address) {
    return this.meApi
      .updateMyAddress(
        address.id!,
        address.name,
        address.streetName,
        address.zipCode,
        address.cityId,
        address.isDefault ?? false,
        address.isBilling ?? false,
        address.streetNumber ?? undefined,
        address.floor ?? undefined,
        address.door ?? undefined
      )
      .pipe(tap(() => this.updateAddresses()));
  }

  delete(id: number) {
    return this.meApi
      .deleteMyAddress(id)
      .pipe(tap(() => this.updateAddresses()));
  }
}
