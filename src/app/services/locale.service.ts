import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Locale } from '../model/locale';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  private readonly locales: Locale[] = [
    { id: "en-GB", name: "English", basePath: "", isDefault: true },
    { id: "fr-FR", name: "Français", basePath: "fr-FR", isDefault: false },
    { id: "es-ES", name: "Español", basePath: "es-ES", isDefault: false }
  ];

  defaultLocale!: Locale;
  currentLocale!: Locale;

  constructor(private router: Router, @Inject(LOCALE_ID) private currentLocaleId: string) {
    this.defaultLocale = this.locales.filter((l) => l.isDefault).at(0)!;
    this.currentLocale = this.locales.filter((l) => l.id === currentLocaleId).at(0)!;
  }

  getDefaultLocale() {
    return this.defaultLocale;
  }

  getCurrentLocale() {
    return this.currentLocale;
  }

  getSupportedLocales() {
    return this.locales;
  }

  switchLocale(targetLocale: Locale) {
    window.location.href = `${targetLocale.basePath}${this.router.url}`;
  }

}
