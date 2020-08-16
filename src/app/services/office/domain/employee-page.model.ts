import { Employee } from './employee.model';

export interface EmployeePage {
  employees: Employee[];
  totalPages: number;
  totalElements: number;
}
