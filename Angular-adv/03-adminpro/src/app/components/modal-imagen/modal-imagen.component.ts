import { Component } from '@angular/core';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(
    public modalImagenSrv: ModalImagenService,
    public fileUploadSrv: FileuploadService
  ) {}

  cerrarModal() {
    this.modalImagenSrv.cerrarModal();
    this.imgTemp = null;
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

    const id = this.modalImagenSrv.id;
    const tipo = this.modalImagenSrv.tipo;

    this.fileUploadSrv.actualizarFoto(this.imagenSubir, tipo, id)
        .then( img => {
          Swal.fire('', 'Imagen modificada con éxito', 'success');
          this.modalImagenSrv.nuevaImagen.emit(img);
          this.cerrarModal();
        }).catch(err => {
          Swal.fire('Error','No se pudo subir la imgagen', 'error');
        })
  }

}
