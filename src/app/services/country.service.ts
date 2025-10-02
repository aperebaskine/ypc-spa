import { Injectable } from '@angular/core';
import { GeoService as GeoApi } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private geoApi: GeoApi) { }

  findAll() {
    return this.geoApi.findAllCountries();
  }

}
