import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}
  get token(): string {
    return localStorage.getItem('token' || '');
  }

  onUploadUser(user_id: string, fd) {
    return this.http.put(`${base_url}/upload/users/${user_id}`, fd, {
      headers: { 'x-token': this.token },
    });
  }
}
