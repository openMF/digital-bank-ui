
export interface Permission {
  permittableEndpointGroupIdentifier: string;
  allowedOperations: AllowedOperation[];
}

export type AllowedOperation = 'READ' | 'CHANGE' | 'DELETE';
