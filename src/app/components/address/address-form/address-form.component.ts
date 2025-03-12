import { AfterViewInit, Component, inject, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Address, City, Country, Province } from '../../../generated';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryService } from '../../../services/country.service';
import { ProvinceService } from '../../../services/province.service';
import { CityService } from '../../../services/city.service';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
})
export class AddressFormComponent implements OnInit {

  @Input() address?: Address = inject(MAT_DIALOG_DATA).address;

  form = inject(FormBuilder).group({
    streetName: ['', Validators.required],
    streetNumber: [0],
    floor: [0],
    door: [''],
    zipCode: ['', Validators.required],
    cityId: [{ value: 0 as number | string | null, disabled: true }, Validators.required],
    provinceId: [{ value: 0, disabled: true }, Validators.required],
    countryId: ['', Validators.required],
    isDefault: [false, Validators.required],
    isBilling: [false, Validators.required],
  });

  cityFormControl = this.form.get('cityId') as FormControl;

  countries: Country[] = [];
  provinces: Province[] = [];
  cities: City[] = [];
  filteredCities?: Observable<City[]>;

  constructor(
    private countryService: CountryService,
    private provinceService: ProvinceService,
    private cityService: CityService,
  ) {
    this.countryService
      .findAll()
      .subscribe((countries) => (this.countries = countries));

    this.form.get('countryId')?.valueChanges.subscribe((countryId) => {
      if (countryId) {
        this.provinceService.findByCountry(countryId)
          .pipe(
            tap(
              (provinces) => this.provinces = provinces
            ),
            tap(
              () => this.form.get('provinceId')?.enable()
            ))
          .subscribe();

      } else {
        this.provinces = [];
        this.form.get('provinceId')?.disable();
      }
    });

    this.form.get('provinceId')?.valueChanges.subscribe((provinceId) => {
      if (provinceId) {
        this.cityService.findByProvince(provinceId)
          .pipe(
            tap(
              (cities) => this.cities = cities
            ),
            tap(
              () => this.form.get('cityId')?.enable()
            ))
          .subscribe();
      } else {
        this.cities = [];
        this.form.get('cityId')?.disable();
      }
    });
  }

  initializeForm() {

    this.form.reset({
      streetName: this.address?.streetName ?? '',
      streetNumber: this.address?.streetNumber ?? null,
      floor: this.address?.floor ?? null,
      door: this.address?.door ?? '',
      zipCode: this.address?.zipCode ?? '',
      cityId: this.address?.cityId ?? null,
      provinceId: this.address?.provinceId ?? null,
      countryId: this.address?.countryId ?? null,
      isDefault: this.address?.isDefault ?? false,
      isBilling: this.address?.isBilling ?? false
    });
  }

  displayCity() {
    return (value: any) => {
      console.log(value);
      console.log(this.cities);
      return this.cities!
        .filter(city => city.id == value)
        .map(city => city.name)
        .pop()!;
    }
  }

  ngOnInit() {
    this.filteredCities = this.form.get('cityId')!.valueChanges
      .pipe(
        startWith(''),
        map((value) => {
          if (typeof value === 'string') {
            return this.cities!.filter(
              (city) => city.name!.toLowerCase().includes(value.trim().toLowerCase())
            );
          }

          return this.cities!;
        })
      );
    this.initializeForm();
  }

}
