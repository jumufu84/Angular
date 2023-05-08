import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit{

  public linkTheme = document.querySelector('#theme');
  public links: any;

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme(theme: string){
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('theme',url);
    sessionStorage.setItem('theme',url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {

    this.links.forEach( (x: any) => {
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
