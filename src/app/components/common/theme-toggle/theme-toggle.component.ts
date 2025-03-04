import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DarkModeService } from '../../../services/dark-mode.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-theme-toggle',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {

  iconName!: string;

  constructor(private darkModeService: DarkModeService) {
    this.updateIcon();
  }

  updateIcon() {
    this.iconName = this.darkModeService.isDarkModeOn() ? "light_mode" : "dark_mode";
  }

  toggleDarkMode() {
    this.darkModeService.toggle();
    this.updateIcon();
  }

}
