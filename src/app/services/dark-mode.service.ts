import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private readonly key = "dark-mode";

  constructor() {
    if (this.isDarkModeOn()) {
      this.enableDarkMode();
    }
  }

  enableDarkMode() {
    document.documentElement.classList.add(this.key);
    localStorage.setItem(this.key, JSON.stringify(true));
  }

  disableDarkMode() {
    document.documentElement.classList.remove(this.key);
    localStorage.setItem(this.key, JSON.stringify(false));
  }

  toggle() {
    const isDarkMode = document.documentElement.classList.toggle(this.key);
    localStorage.setItem(this.key, JSON.stringify(isDarkMode));
  }

  isDarkModeOn() {
    let isDarkModeOn = localStorage.getItem(this.key);
    return isDarkModeOn ? JSON.parse(isDarkModeOn) : false;
  }
}
