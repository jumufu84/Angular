import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email'), [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userSrv: UsuarioService
  ) {}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '994843242282-ot46shlnjkft39eo1l5dl09mji79t8gq.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    this.userSrv.loginGoogle(response.credential)
                .subscribe( resp => {
                  this.router.navigateByUrl('/');
                })
  }

  logIn() {
    console.log(this.loginForm.value);
    this.userSrv.logIn(this.loginForm.value)
                .subscribe({
                  next: () => {
                    if(this.loginForm.get('remember')?.value){
                      localStorage.setItem('email',this.loginForm.get('email')?.value || '');
                    } else{
                      localStorage.removeItem('email');
                    }
                    this.router.navigateByUrl('/');
                  },
                  error: (err) =>{
                    //Si ocurre error
                    Swal.fire('Error',err.error.msg, 'error');
                  }
                });
  }

}
