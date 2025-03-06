import { Injectable } from '@angular/core';
import { DefaultService } from '../generated';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private defaultService: DefaultService) {
   }

   
}
