

export interface PermittableEndpoint {
  path: string;
  method: Method;
  groupId?: string;
}

export type Method = 'POST' | 'HEAD' | 'PUT' | 'DELETE';
