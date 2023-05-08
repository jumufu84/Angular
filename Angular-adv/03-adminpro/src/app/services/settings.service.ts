import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');


  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/green.css';
    this.linkTheme?.setAttribute('href',url);
  }

  changeTheme(theme: string){
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('theme',url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {

    const links = document.querySelectorAll('.selector');

    links.forEach( (x: any) => {
      x.classList.remove('working');
      const btnTheme = x.getAttribute('data-theme');
      const btnThemeURL = `./assets/css/colors/${btnTheme}.css`
      const currentTheme = this.linkTheme?.getAttribute('href');

      if(btnThemeURL === currentTheme){
        x.classList.add('working');
      }
    })
  }

}
