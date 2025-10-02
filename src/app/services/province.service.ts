import { Injectable } from '@angular/core';
import { GeoService as GeoApi } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private geoApi: GeoApi) { }

  findByCountry(countryId: string) {
    return this.geoApi.findProvincesByCountry(countryId);
  }
}
