import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LocaleMenuComponent } from "../../../common/locale-menu/locale-menu.component";
import { DarkModeToggleComponent } from "../../../common/theme-toggle/dark-mode-toggle.component";

@Component({
  selector: 'app-user-menu',
  imports: [
    MatButtonModule,
    MatIconModule,
    DarkModeToggleComponent,
    LocaleMenuComponent
],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent { }
