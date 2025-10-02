import { Injectable } from '@angular/core';
import { GeoService as GeoApi } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private geoApi: GeoApi) { }

  findByProvince(provinceId: number) {
    return this.geoApi.findCitiesByProvince(provinceId);
  }
}
