import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscribable, Subscription, delay } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy{

  public totalUsuarios = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(
    private userSrv: UsuarioService,
    private busquedaSrv: BusquedasService,
    private modalImgSrv: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImgSrv.nuevaImagen
        .pipe(
          delay(100)
        )
        .subscribe(img => this.cargarUsuarios());
  }

  cargarUsuarios(){
    this.cargando = true;
    this.userSrv.cargarUsuarios(this.desde)
        .subscribe(( {total,usuarios} )=>{
          this.totalUsuarios = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if(this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {

    if(termino.length === 0){
      return this.usuarios = this.usuariosTemp;
    }
    return this.busquedaSrv.buscar('usuarios',termino)
        .subscribe( resultados => {
          this.usuarios = resultados;
        });
  }

  eliminarUsuario(usuario: Usuario) {

    if(usuario.uid === this.userSrv.uid){
      return Swal.fire('Error', 'No puede eliminarse a si mismo', 'error');
    }
    return Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está a punto de eliminar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userSrv.eliminarUsuario(usuario)
            .subscribe (resp =>
              {
                Swal.fire(
                  'Usuario eliminado',
                  `${usuario.nombre} fue eliminado correctamente`,
                  'success'
                  );
                  this.cargarUsuarios();
              }
            )
      }
    })
  }

  cambiarRole(usuario: Usuario) {
    this.userSrv.guardarUsuario(usuario)
        .subscribe(resp => {
          console.log(resp);
        })
  }

  abrirModal(usuario: Usuario) {
    this.modalImgSrv.abrirModal('usuarios', usuario.uid, usuario.img);
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
