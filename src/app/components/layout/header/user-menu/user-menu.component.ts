import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { LocaleMenuComponent } from "../../../common/locale-menu/locale-menu.component";
import { DarkModeToggleComponent } from "../../../common/theme-toggle/dark-mode-toggle.component";
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-user-menu',
  imports: [
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
    this.cartService.subscribe((cart) => {
      this.cartSize = cart.size > 0 ? cart.size : null;
    });
  }
}
