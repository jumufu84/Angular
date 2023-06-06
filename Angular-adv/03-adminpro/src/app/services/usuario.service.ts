import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get uid() {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.revoke('jumufu84@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
  }

  validarToken():Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`,{
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map ((resp: any )=> {
        const {nombre, email, google, role, uid, img = ''} = resp.usuario;
        this.usuario = new Usuario(nombre,email,'', img,google, role, uid);
        localStorage.setItem('token',resp.token);
        return true;
      }),
      catchError(err => of(false))
    )
  }

  crearUsuario (formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`,formData)
                .pipe(
                  tap((resp: any) => {
                    localStorage.setItem('token',resp.token);
                  })
                );
  }

  actualizarPerfil(data:{nombre:string, email:string, role: string}) {

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  logIn (formData: any) {
    return this.http.post(`${base_url}/login`,formData)
                .pipe(
                  tap((resp: any) => {
                    localStorage.setItem('token',resp.token);
                  })
                );
  }

  loginGoogle (token: string){
    return this.http.post(`${base_url}/login/google`,{token})
                    .pipe(
                      tap((resp: any) => {
                        localStorage.setItem('token', resp.token);
                      })
                    )
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
               .pipe(
                map(resp => {
                  const usuarios = resp.usuarios.map(user =>
                                      new Usuario(user.nombre,user.email,'',user.img, user.google, user.role, user.uid));
                  return {
                    total: resp.total,
                    usuarios
                  };
                }

                )
               )

  }

  eliminarUsuario(usuario: Usuario) {
    return this.http.delete(`${base_url}/usuarios/${usuario.uid}`, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
      return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
    }


  }
