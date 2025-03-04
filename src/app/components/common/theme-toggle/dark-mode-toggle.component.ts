import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DarkModeService } from '../../../services/dark-mode.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-theme-toggle',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.scss'
})
export class DarkModeToggleComponent {

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
