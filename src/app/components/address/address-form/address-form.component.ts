import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Address, City, Country, Province } from '../../../generated';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../../services/country.service';
import { ProvinceService } from '../../../services/province.service';
import { CityService } from '../../../services/city.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BehaviorSubject, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MATERIAL_DEFAULT_PROVIDERS } from '../../../providers/material-providers';
import { AddressService } from '../../../services/address.service';

@Component({
  selector: 'app-address-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatButtonModule,
  ],
  providers: [...MATERIAL_DEFAULT_PROVIDERS],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
})
export class AddressFormComponent implements OnInit {
  @Input() address?: Address;
  @Input() onCancel?: () => {};
  @Output() addressSubmitted: EventEmitter<Address> =
    new EventEmitter<Address>();
  addressCount: number = 0;

  form = inject(FormBuilder).group({
    name: ['', Validators.required],
    streetName: ['', Validators.required],
    streetNumber: [0],
    floor: [0],
    door: [''],
    zipCode: ['', Validators.required],
    cityId: [
      { value: null as number | null, disabled: true },
      Validators.required,
    ],
    provinceId: [{ value: 0, disabled: true }, Validators.required],
    countryId: ['', Validators.required],
    isDefault: [false, Validators.required],
    isBilling: [false, Validators.required],
  });

  countrySubject = new BehaviorSubject<Country[]>([]);
  provinceSubject = new BehaviorSubject<Province[]>([]);
  citySubject = new BehaviorSubject<City[]>([]);

  cities: City[] = [];
  filteredCitySubject = new BehaviorSubject<City[]>([]);

  constructor(
    private addressService: AddressService,
    private countryService: CountryService,
    private provinceService: ProvinceService,
    private cityService: CityService
  ) {}

  displayCity() {
    return (value: any) => {
      return this.cities.find((city) => city.id == value)?.name ?? '';
    };
  }

  ngOnInit() {
    this.countryService.findAll().subscribe(this.countrySubject);

    this.form.get('countryId')?.valueChanges.subscribe((countryId) => {
      this.form.get('provinceId')?.reset(null, { emitEvent: false });

      if (countryId) {
        this.provinceService
          .findByCountry(countryId)
          .pipe(
            tap((provinces) => this.provinceSubject.next(provinces)),
            tap(() => {
              if (!this.form.touched && this.address) {
                this.form.get('provinceId')?.setValue(this.address.provinceId!);
              }
            }),
            tap(() => this.form.get('provinceId')?.enable())
          )
          .subscribe();
      } else {
        this.provinceSubject.next([]);
        this.form.get('provinceId')?.disable();
      }
    });

    this.form.get('provinceId')?.valueChanges.subscribe((provinceId) => {
      this.form.get('cityId')?.reset(null, { emitEvent: false });

      if (provinceId) {
        this.cityService
          .findByProvince(provinceId)
          .pipe(
            tap((cities) => this.citySubject.next(cities)),
            tap((cities) => (this.cities = cities)),
            tap((cities) => this.filteredCitySubject.next(cities)),
            tap(() => {
              if (!this.form.touched && this.address) {
                this.form.get('cityId')?.setValue(this.address.cityId!);
              }
            }),
            tap(() => this.form.get('cityId')?.enable())
          )
          .subscribe();
      } else {
        this.citySubject.next([]);
        this.form.get('cityId')?.disable();
      }
    });

    this.addressService.getAddresses().subscribe((addresses) => {
      this.addressCount = addresses.length;
      this.initializeForm();
    });
  }

  filterCities(event: Event) {
    let cityInput = event.target as HTMLInputElement;

    this.filteredCitySubject.next(
      this.cities.filter((city) =>
        city.name?.toLowerCase().includes(cityInput.value.trim().toLowerCase())
      )
    );
  }

  initializeForm() {
    this.form.reset({
      name: this.address?.name ?? '',
      streetName: this.address?.streetName ?? '',
      streetNumber: this.address?.streetNumber ?? null,
      floor: this.address?.floor ?? null,
      door: this.address?.door ?? '',
      zipCode: this.address?.zipCode ?? '',
      cityId: this.address?.cityId ?? null,
      provinceId: this.address?.provinceId ?? null,
      countryId: this.address?.countryId ?? null,
      isDefault: this.address?.isDefault ?? false,
      isBilling: this.address?.isBilling ?? false,
    });

    this.initDefaultToggle();
    this.initBillingToggle();
  }

  reset() {
    this.initializeForm();
  }

  submit() {
    if (this.form.valid) {
      this.addressSubmitted.emit(this.form.getRawValue() as Address);
    }
  }

  initDefaultToggle() {
    const toggle = this.form.get('isDefault')!;

    if (!this.address) {
      toggle.setValue(this.addressCount < 1);

      if (this.addressCount < 1) {
        toggle.disable();
      }
    } else {
      toggle.setValue(this.address.isDefault!);

      if (this.address.isDefault!) {
        toggle.disable();
      }
    }
  }

  initBillingToggle() {
    const toggle = this.form.get('isBilling')!;

    if (!this.address) {
      toggle.setValue(this.addressCount < 1);

      if (this.addressCount < 1) {
        toggle.disable();
      }
    } else {
      toggle.setValue(this.address.isBilling!);

      if (this.address.isBilling!) {
        toggle.disable();
      }
    }
  }
}
