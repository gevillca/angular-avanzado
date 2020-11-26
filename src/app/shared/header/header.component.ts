import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UsersService) {}

  ngOnInit(): void {}
  logout() {
    this.userService.logout();
  }
}
