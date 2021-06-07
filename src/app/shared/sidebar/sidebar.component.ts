import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.models';
import { UsersService } from 'src/app/services/users.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  // menuItems: any[];
  public imgUrl = '';
  public user: User;
  constructor(
    public sidebarService: SidebarService,
    private userService: UsersService
  ) {
    this.user = userService.usuario;
    // this.menuItems = sidebarService.menu;
    // console.log(this.menuItems);
  }
  logout() {
    this.userService.logout();
  }

  ngOnInit(): void {}
}
