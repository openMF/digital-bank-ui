import { TimeUnit } from '../time-unit.model';
import { InterestPayable } from '../interest-payable.model';

export interface Term {
  period?: number;
  timeUnit?: TimeUnit;
  interestPayable: InterestPayable;
}
