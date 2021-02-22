import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/users.models';
import { SearchsService } from '../../../services/searchs.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUser: number = 0;
  public usuarios: User[] = [];
  public usuariosTemporal: User[] = [];
  public desde: number = 0;
  public load = false;
  public imgSubs: Subscription;
  constructor(
    public userService: UsersService,
    private searchService: SearchsService,
    private modalImagenService: ModalImagenService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUser();
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe((img) => {
      this.loadUser();
    });
  }

  loadUser() {
    this.load = true;
    this.userService.getUsers(this.desde).subscribe(({ total, data }) => {
      this.totalUser = total;
      this.usuarios = data;
      this.usuariosTemporal = data;
      this.load = false;
    });
  }

  changePage(valor) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUser) {
      this.desde -= valor;
    }
    this.loadUser();
  }
  searchUser(term: string) {
    if (term.length === 0) {
      return (this.usuarios = this.usuariosTemporal);
    }

    this.searchService.search('users', term).subscribe((res: User[]) => {
      this.usuarios = res;
    });
  }
  deleteUser(user: User) {
    if (user.user_id === this.userService.user_id) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: `¿Borrar Usuario?`,
      text: `¿Esta Seguro de Eliminar a ${user.user_name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.user_id).subscribe(() => {
          Swal.fire(
            'Usuario borrado!',
            `Usuario ${user.user_name} fue eliminado correctamente`,
            'success'
          );
          this.loadUser();
        });
      }
    });
  }
  changeRole(user: User) {
    this.userService.saveUserRole(user).subscribe((res) => {});
  }
  openModal(user: User) {
    this.modalImagenService.openModal('users', user.user_id, user.user_img);
  }
}
