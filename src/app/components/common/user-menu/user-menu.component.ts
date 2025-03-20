import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { LocaleMenuComponent } from "../locale-menu/locale-menu.component";
import { DarkModeToggleComponent } from "../theme-toggle/dark-mode-toggle.component";
import { CartService } from '../../../services/cart.service';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Customer } from '../../../generated';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-user-menu',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    DarkModeToggleComponent,
    LocaleMenuComponent
  ],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  user!: Observable<Customer | null>;
  cartSize: number | null = null;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private cartService: CartService
  ) {
    this.user = this.userService.user;

    this.cartService.cart.subscribe((cart) => {
      this.cartSize = cart.products.length > 0 ? cart.products.length : null;
    });
  }

  logout() {
    this.authService.logout();
  }
}
