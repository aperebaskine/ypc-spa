import { Injectable } from '@angular/core';
import { DefaultService } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private defaultService: DefaultService) { }

  findAll() {
    return this.defaultService.findAllCountries();
  }

}
