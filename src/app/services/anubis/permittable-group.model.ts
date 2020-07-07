
import {PermittableEndpoint} from './permittable-endpoint.model';

export interface PermittableGroup {
  identifier: string;
  permittables: PermittableEndpoint[];
}
