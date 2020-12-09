import { User } from '../models/users.models';
export interface LoadUser {
  total: number;
  data: User[];
}
