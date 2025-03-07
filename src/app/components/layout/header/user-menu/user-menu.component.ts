import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { LocaleMenuComponent } from "../../../common/locale-menu/locale-menu.component";
import { DarkModeToggleComponent } from "../../../common/theme-toggle/dark-mode-toggle.component";
import { CartService } from '../../../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  imports: [
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
  cartSize: number | null = null;

  constructor(private cartService: CartService) {
    this.cartService.cart.subscribe((cart) => {
      this.cartSize = cart.products.length > 0 ? cart.products.length : null;
    });
  }
}
