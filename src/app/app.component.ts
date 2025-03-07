import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { CartService } from './services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ypc-spa';

  constructor(
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private router: Router
  ) {
    this.notifyAddedItemToCart();
  }

  notifyAddedItemToCart() {
    this.cartService.addedItem.subscribe(
      (cartItem) => this.snackBar.open(
        $localize`${cartItem.name ?? $localize`Product`} successfully added to cart!`,
        $localize`Dismiss`,
        { verticalPosition: 'top', duration: 1800 }
      ));
  }
}
