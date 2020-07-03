
import {PermissionId} from './permission-id.type';

export interface FimsPermission {
  id: PermissionId;
  accessLevel: AccessLevel;
}

export type AccessLevel = 'READ' | 'CHANGE' | 'DELETE';
