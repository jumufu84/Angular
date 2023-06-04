import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor(
    private userSrv: UsuarioService
  ) {
    console.log(userSrv.usuario.imagenUrl);
    this.usuario = userSrv.usuario;
  }

  logout() {
    this.userSrv.logout();
  }
}
