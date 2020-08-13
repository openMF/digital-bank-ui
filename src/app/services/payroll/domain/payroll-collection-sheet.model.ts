import {PayrollPayment} from './payroll-payment.model';

export interface PayrollCollectionSheet {
  sourceAccountNumber: string;
  payrollPayments: PayrollPayment[];
}
