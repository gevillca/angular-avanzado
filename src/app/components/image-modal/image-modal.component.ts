import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/users.models';
// import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: [],
})
export class ImageModalComponent implements OnInit {
  public imgTemp: any = null;
  selectedFile: File = null;
  public user: User;
  // public imgTemp: any = null;
  constructor(
    public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService // public userService: UsersService
  ) {
    // this.user = userService.usuario;
  }

  ngOnInit(): void {}

  closeModal() {
    this.imgTemp = null;
    this.modalImagenService.closeModal();
  }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];

    if (!this.selectedFile) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }
  onUploadFile() {
    const fd = new FormData();
    const user_id = this.modalImagenService.user_id;
    const tipo = this.modalImagenService.tipo;
    // const user_img=this.modalImagenService.user_img
    fd.append('imagen', this.selectedFile);
    this.fileUploadService.onUploadUser(user_id, tipo, fd).subscribe(
      (res: any) => {
        // this.user.user_img = res.nameFile;
        Swal.fire('Guardado', 'Imagen actualizada', 'success');
        this.modalImagenService.nuevaImagen.emit(res.nameFile);
        this.closeModal();
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
}
