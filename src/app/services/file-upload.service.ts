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

  onUpload(user_id: string, fd) {
    console.log(this.token);
    return this.http.put(`${base_url}/upload/users/${user_id}`, fd, {
      headers: { 'x-token': this.token },
    });
  }
}
