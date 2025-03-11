import { Injectable } from '@angular/core';
import { DefaultService } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private defaultService: DefaultService) { }

  findByCountry(countryId: string) {
    return this.defaultService.findProvincesByCountry(countryId);
  }
}
