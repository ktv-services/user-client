import { Permission } from './permission';
import { Base } from './base.model';

export interface Role extends Base {
  _id?: string;
  name: string;
  status: string;
  permissions?: Permission[];
  created?: string;
  updated?: string;
}
