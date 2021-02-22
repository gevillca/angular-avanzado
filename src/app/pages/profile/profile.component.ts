import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/users.models';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public user: User;
  public imgTemp: any = null;
  selectedFile: File = null;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      user_name: [this.user.user_name, Validators.required],
      user_email: [
        this.user.user_email,
        [Validators.required, Validators.email],
      ],
    });
  }
  updateProfile() {
    this.userService.updatedProfile(this.profileForm.value).subscribe(
      (res) => {
        const { user_name, user_email } = this.profileForm.value;
        this.user.user_name = user_name;
        this.user.user_email = user_email;

        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'warning');
      }
    );
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
    fd.append('imagen', this.selectedFile);
    this.fileUploadService
      .onUploadUser(this.user.user_id, 'users', fd)
      .subscribe(
        (res: any) => {
          this.user.user_img = res.nameFile;
          Swal.fire('Guardado', 'Imagen actualizada', 'success');
        },
        (err) => {
          console.log('error', err);
        }
      );
  }
}
