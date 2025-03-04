import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LocaleService } from '../../../services/locale.service';
import { Locale } from '../../../model/locale';

@Component({
  selector: 'app-locale-menu',
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './locale-menu.component.html',
  styleUrl: './locale-menu.component.scss'
})
export class LocaleMenuComponent {

  locales!: Locale[];
  currentLocale!: Locale;

  constructor(private localeService: LocaleService) {
    this.locales = this.localeService.getSupportedLocales();
    this.currentLocale = this.localeService.getCurrentLocale();
  }

  switchLocale(locale: Locale) {
    this.localeService.switchLocale(locale);
  }

}
