import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit{

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private userSrv: UsuarioService,
    private fileUploadSrv: FileuploadService
    ) {
      this.usuario = userSrv.usuario;
    }

  ngOnInit(): void {

    this.perfilForm = this.fb.group(
      {
        nombre: new FormControl (this.usuario.nombre, Validators.required),
        email: new FormControl (this.usuario.email, [Validators.required, Validators.email])
      }
    );
  }

  actualizarPerfil() {
    console.log('Form->', this.perfilForm.value);
    this.userSrv.actualizarPerfil(this.perfilForm.value)
        .subscribe(
          () =>{
            const {nombre, email} = this.perfilForm.value;
            this.usuario.nombre = nombre;
            this.usuario.email = email;
            Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
          },
          (err) => {
            Swal.fire('Error', err.error.msg,'error');
          }
        );
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if(!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {
    this.fileUploadSrv.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
        .then( img => {
          this.usuario.img = img
          Swal.fire('', 'Imagen modificada con éxito', 'success');
        } )
  }



}
