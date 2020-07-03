import { FimsPermissionDescriptor } from './fims-permission-descriptor';
import { IdentityPermittableGroupIds } from '../../identity/domain/permittable-group-ids.model';
import { PermissionId } from './permission-id.type';
import { Injectable } from '@angular/core';

interface PermittableGroupMap {
  [s: string]: FimsPermissionDescriptor;
}

/**
 * Maps permittable group ids to internal keys
 */
@Injectable()
export class PermittableGroupIdMapper {
  private _permittableGroupMap: PermittableGroupMap = {};

  constructor() {
    this._permittableGroupMap[IdentityPermittableGroupIds.IDENTITY_MANAGEMENT] = { id: 'identity_identities', label: 'Identities' };
    this._permittableGroupMap[IdentityPermittableGroupIds.ROLE_MANAGEMENT] = { id: 'identity_roles', label: 'Roles' };
    this._permittableGroupMap[IdentityPermittableGroupIds.SELF_MANAGEMENT] = {
      id: 'identity_self',
      label: 'User created resources(Identity & Roles)',
    };
  }

  public map(permittableGroupId: string): FimsPermissionDescriptor {
    const descriptor: FimsPermissionDescriptor = this._permittableGroupMap[permittableGroupId];
    if (!descriptor) {
      console.warn(`Could not find permission descriptor for permittable group id '${permittableGroupId}'`);
    }
    return descriptor;
  }

  public isValid(id: PermissionId): boolean {
    for (const key in this._permittableGroupMap) {
      if (this._permittableGroupMap.hasOwnProperty(key)) {
        const descriptor: FimsPermissionDescriptor = this._permittableGroupMap[key];
        if (descriptor.id === id) {
          return true;
        }
      }
    }
    return false;
  }
}
