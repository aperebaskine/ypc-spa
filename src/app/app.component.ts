import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CartService } from './services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayoutManagerComponent } from "./components/common/layout-manager/layout-manager.component";
import { MATERIAL_DEFAULT_PROVIDERS } from './providers/material-providers';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  imports: [
    LayoutManagerComponent
  ],
  providers: [...MATERIAL_DEFAULT_PROVIDERS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ypc-spa';

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    // Send notification for item added to cart
    this.cartService.addedItem.subscribe(
      (cartItem) => this.snackBar.open(
        $localize`${cartItem.name ?? $localize`Product`} successfully added to cart!`,
        $localize`Dismiss`,
        { verticalPosition: 'top', duration: 1800 }
      ));

      this.authService.refresh();
  }
}
