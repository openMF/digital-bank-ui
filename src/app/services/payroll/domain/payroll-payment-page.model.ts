import {PayrollPayment} from './payroll-payment.model';

export interface PayrollPaymentPage {
  payrollPayments: PayrollPayment[];
  totalPages: number;
  totalElements: number;
}
