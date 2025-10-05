import { Injectable } from '@angular/core';
import { Customer, CustomerService as CustomerApi, MeService as MeApi } from '../generated';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userSubject!: BehaviorSubject<Customer | null>;
  public readonly user!: Observable<Customer | null>;

  constructor(
    private meApi: MeApi,
    private customerApi: CustomerApi,
    private authService: AuthenticationService
  ) {
    this.userSubject = new BehaviorSubject<Customer | null>(null);
    this.user = this.userSubject.asObservable();

    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.updateUser();
      } else {
        this.userSubject.next(null);
      }
    });
  }

  updateUser() {
    this.meApi
      .getMe()
      .subscribe((user) => this.userSubject.next(user));
  }

  exists(email: string) {
    return this.customerApi.customerEmailExists(email);
  }

  uploadAvatar(avatar: File) {
    return this.meApi
      .uploadMyAvatar(avatar);
  }

  downloadAvatar() {
    return this.meApi.getMyAvatar().pipe(map((blob) => URL.createObjectURL(blob)));
  }
}
