import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LocaleMenuComponent } from "../../../common/locale-menu/locale-menu.component";
import { ThemeToggleComponent } from "../../../common/theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-user-menu',
  imports: [
    MatButtonModule,
    MatIconModule,
    ThemeToggleComponent,
    LocaleMenuComponent
],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent { }
