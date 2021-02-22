import { environment } from '../../environments/environment';
const base_url = environment.base_url;
export class User {
  constructor(
    public user_name: string,
    public user_email: string,
    public user_password?: string,
    public user_google?: boolean,
    public user_img?: string,
    public user_role?: string,
    public user_state?: boolean,
    public user_created?: string,
    public user_updated?: string,
    public user_id?: string
  ) {}
  // get getImage() {
  //  http://localhost:3005/api/upload/users/no-image
  // if (!this.user_img) {
  //   return `${base_url}/upload/users/no-image`;
  // }
  // if (this.user_img.includes('https')) {
  //   return this.user_img;
  // }
  // if (this.user_img) {
  //   return `${base_url}/upload/users/${this.user_img}`;
  // } else {
  //   return `${base_url}/upload/users/no-image`;
  // }
  // }
}
