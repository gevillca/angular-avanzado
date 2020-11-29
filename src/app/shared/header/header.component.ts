import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/users.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public imgUrl = '';
  public user: User;
  constructor(private userService: UsersService) {
    // this.imgUrl = userService.user.getImage;

    this.user = userService.usuario;
    // console.log(this.user);
  }

  ngOnInit(): void {}
  logout() {
    this.userService.logout();
  }
}
