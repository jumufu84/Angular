import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Julio Julito',[Validators.required, Validators.minLength(3)]],
    email: ['Juls100@gmail.com', [Validators.required, Validators.email]],
    password: ['12345', Validators.required],
    password2: ['12345', Validators.required],
    terms: [true, Validators.required]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  }
  );

  constructor(
    private fb: FormBuilder,
    private userSrv: UsuarioService,
    private router: Router
    ) {}

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid){
      return;
    } else {
      this.userSrv.crearUsuario(this.registerForm.value)
      .subscribe( {
        next: (resp) => {
          this.router.navigateByUrl('/');
          },
        error: (err) => {
          //Si ocurre error
          Swal.fire('Error',err.error.msg, 'error');
        }
      });
    }
  }

  campoNoValido(campo: string): boolean{
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    } else{
      return false;
    }
  }

  contrasenaInvalida(){
    return !(this.registerForm.get('password')?.value === this.registerForm.get('password2')?.value);
  }

  aceptaTerminos() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  passwordsIguales(pass1: string, pass2: string) {

    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({noEsIgual: true})
      }
    }
  }

}
