
import {PermissionId} from './permission-id.type';

export interface FimsPermissionDescriptor {
  id: PermissionId;
  label: string;
  description?: string;
  readOnly?: boolean;
}
