export class User {
  constructor(
    public user_name: string,
    public user_email: string,
    public user_password: string,
    public user_google?: string,
    public user_img?: string,
    public user_role?: string,
    public user_state?: string,
    public user_created?: string,
    public user_updated?: string,
    public user_id?: string
  ) {}
}
