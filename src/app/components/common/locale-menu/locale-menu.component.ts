import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locale-menu',
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './locale-menu.component.html',
  styleUrl: './locale-menu.component.scss'
})
export class LocaleMenuComponent {

  locales = [
    { id: "en-GB", name: "English" },
    { id: "fr-FR", name: "Français" },
    { id: "es-ES", name: "Español" }
  ];

  constructor(private router: Router) {
  }

  switchLocale(locale: string) {
    window.location.href = `/${locale}${this.router.url}`;
  }

}
