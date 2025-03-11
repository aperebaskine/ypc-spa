import { Component, inject, Inject, Input } from '@angular/core';
import { Address, City, Country, Province } from '../../../generated';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryService } from '../../../services/country.service';
import { ProvinceService } from '../../../services/province.service';
import { CityService } from '../../../services/city.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-address-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
})
export class AddressFormComponent {
  private fb = inject(FormBuilder);

  @Input() address?: Address;

  countries?: Country[];
  provinces?: Province[];
  cities?: City[];

  form = this.fb.group({
    streetName: ['', Validators.required],
    streetNumber: [],
    floor: [],
    door: [''],
    zipCode: ['', Validators.required],
    cityId: [Validators.required],
    provinceId: [Validators.required],
    countryId: ['', Validators.required],
    isDefault: [false, Validators.required],
    isBilling: [false, Validators.required],
  });

  constructor(
    private countryService: CountryService,
    private provinceService: ProvinceService,
    private cityService: CityService,
    @Inject(MAT_DIALOG_DATA) private data: { address?: Address }
  ) {
    this.address = this.data.address;

    this.countryService
      .findAll()
      .subscribe((countries) => (this.countries = countries));

    this.form.get('countryId')!.valueChanges.subscribe((countryId) => {
      if (countryId) {
        this.provinceService
          .findByCountry(countryId)
          .subscribe((provinces) => (this.provinces = provinces));
      }
    });

    this.form.get('provinceId')!.valueChanges.subscribe((provinceId) => {
      if (provinceId) {
        this.cityService
          .findByProvince(provinceId)
          .subscribe((cities) => (this.cities = cities));
      }
    });
  }

  ngAfterViewInit() {}
}
