import { Hospital } from './hospitales.model';
interface _medicoUser {
  user_id: string;
  user_name: string;
  user_state: string;
  user_img: string;
}

export class Medico {
  constructor(
    public medico_name: string,
    public medico_img?: string,
    public medico_created?: string,
    public medico_updated?: string,
    public medico_state?: string,
    public medico_id?: string,
    public medico_user_id?: string,
    public medico_hospital_id?: string,
    public hospitales?: Hospital,
    public users?: _medicoUser
  ) {}
}
