import { Base } from './base.model';

export interface Permission extends Base {
  _id?: string;
  name: string;
  status: string;
  created?: string;
  updated?: string;
}
