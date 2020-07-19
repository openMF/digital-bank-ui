import { FormPermission } from './form-permission.model';

export interface FormPermissionGroup {
  groupId: string;
  formPermissions: FormPermission[];
}
