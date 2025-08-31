import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { Address, City, Country, Province } from '../../../generated';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
import { AddressService } from '../../../services/address.service';
import { MATERIAL_DEFAULT_PROVIDERS } from '../../../providers/material-providers';

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
  @Input() address?: Address = inject(MAT_DIALOG_DATA).address;
  addressCount: number = inject(MAT_DIALOG_DATA).addressCount!;

  form = inject(FormBuilder).group({
    id: [null as number | null],
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
    private countryService: CountryService,
    private provinceService: ProvinceService,
    private cityService: CityService,
    private dialogRef: MatDialogRef<AddressFormComponent>
  ) {
  }

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

    this.initializeForm();
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
      id: this.address?.id ?? null,
      streetName: this.address?.streetName ?? '',
      streetNumber: this.address?.streetNumber ?? null,
      floor: this.address?.floor ?? null,
      door: this.address?.door ?? '',
      zipCode: this.address?.zipCode ?? '',
      cityId: this.address?.cityId ?? null,
      provinceId: this.address?.provinceId ?? null,
      countryId: this.address?.countryId ?? null,
      isDefault: this.address?.default ?? false,
      isBilling: this.address?.billing ?? false,
    });

    this.initDefaultToggle();
    this.initBillingToggle();
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.form.getRawValue());
  }

  initDefaultToggle() {
    const toggle = this.form.get('isDefault')!;

    if (!this.address) {
      toggle.setValue(this.addressCount < 1);

      if (this.addressCount < 1) {
        toggle.disable();
      }
    } else {
      toggle.setValue(this.address.default!);

      if (this.address.default!) {
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
      toggle.setValue(this.address.billing!);

      if (this.address.billing!) {
        toggle.disable();
      }
    }
  }
}
