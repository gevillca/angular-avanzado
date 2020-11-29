import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    user_email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    user_password: ['', Validators.required],
    remember: [false],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UsersService,
    private ngZone: NgZone
  ) {}
  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (resp) => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('user_email').value);
        } else {
          localStorage.removeItem('email');
        }
        // navegar al dashboard
        // this.router.navigate(['/']);
        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
    // this.router.navigate(['/']);
  }
  // var id_token = googleUser.getAuthResponse().id_token;
  onSuccess(googleUser) {
    // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    // console.log(id_token);
  }
  onFailure(error) {
    console.log(error);
  }
  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      // onsuccess: this.onSuccess,
      // onfailure: this.onFailure,
    });
    this.startApp();
  }
  async startApp() {
    await this.userService.googleInnit();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }
  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // console.log(id_token);
        this.userService.loginGoogle(id_token).subscribe((resp) => {
          // navegar al dashboard
          // this.router.navigate(['/']);
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
