import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/users.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public imgUrl = '';
  public user: User;
  constructor(private userService: UsersService, private router: Router) {
    // this.imgUrl = userService.user.getImage;

    this.user = userService.usuario;
    // console.log(this.user);
  }

  ngOnInit(): void {}
  logout() {
    this.userService.logout();
  }
  buscar(termino: string) {
    if (termino.length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
    // console.log(termino);
  }
}
