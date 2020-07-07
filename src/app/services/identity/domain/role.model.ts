
import {Permission} from './permission.model';

export interface Role {
  identifier: string;
  permissions: Permission[];
}
