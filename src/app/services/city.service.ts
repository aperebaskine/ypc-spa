import { Injectable } from '@angular/core';
import { DefaultService } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private defaultService: DefaultService) { }

  findByProvince(provinceId: number) {
    return this.defaultService.findCitiesByProvince(provinceId);
  }
}
