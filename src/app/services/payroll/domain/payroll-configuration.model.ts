import {PayrollAllocation} from './payroll-allocation.model';

export interface PayrollConfiguration {
  mainAccountNumber: string;
  payrollAllocations: PayrollAllocation[];
  createdBy?: string;
  createdOn?: string;
  lastModifiedBy?: string;
  lastModifiedOn?: string;
}
