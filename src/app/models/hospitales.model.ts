interface _hospitalUser {
  user_id: string;
  user_name: string;
  user_state: string;
  user_img: string;
}

export class Hospital {
  constructor(
    public hospital_name: string,
    public hospital_id?: string,
    public hospital_img?: string,
    public hospital_created?: string,
    public hospital_updated?: string,
    public hospital_state?: boolean,
    public users?: _hospitalUser
  ) {}
}
