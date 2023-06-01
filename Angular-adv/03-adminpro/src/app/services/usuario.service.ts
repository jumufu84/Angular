import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.revoke('jumufu84@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
  }

  validarToken():Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`,{
      headers: {
        'x-token': token
      }
    }).pipe(
      tap ((resp: any )=> {
        localStorage.setItem('token',resp.token);
      }),
      map(resp => true),
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

}
