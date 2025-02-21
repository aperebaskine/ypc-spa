import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserMenuComponent } from './user-menu/user-menu.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    UserMenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
