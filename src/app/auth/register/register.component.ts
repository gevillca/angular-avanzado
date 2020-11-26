import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      user_name: ['Tavo', Validators.required],
      user_email: [
        'tavo222@prisma.io',
        [Validators.required, Validators.email],
      ],
      user_password: ['123', Validators.required],
      user_password2: ['123', Validators.required],
      user_terminos: [true, Validators.required],
    },
    {
      validators: this.passwordsIguales('user_password', 'user_password2'),
    }
  );
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {}

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      // console.log('posteando formulario');
      return;
    }
    this.userService.createUser(this.registerForm.value).subscribe(
      (resp: any) => {
        this.router.navigate(['/']);
        // this.router.navigate(['/login']);
        this.router.navigateByUrl('/login');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
  campoNovalido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('user_password').value;
    const pass2 = this.registerForm.get('user_password2').value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptarTerminos() {
    return !this.registerForm.get('user_terminos').value && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }
}
