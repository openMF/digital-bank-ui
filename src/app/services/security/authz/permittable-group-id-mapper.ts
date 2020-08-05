import { FimsPermissionDescriptor } from './fims-permission-descriptor';
import { IdentityPermittableGroupIds } from '../../identity/domain/permittable-group-ids.model';
import { PermissionId } from './permission-id.type';
import { Injectable } from '@angular/core';
import { OfficePermittableGroupIds } from '../../office/domain/permittable-group-ids.model';
import { CustomerPermittableGroupIds } from '../../customer/domain/permittable-group-ids';
import { AccountingPermittableGroupIds } from '../../accounting/domain/permittable-group-ids';
import { PortfolioPermittableGroupIds } from '../../portfolio/domain/permittable-group-ids';
import { GroupPermittableGroupIds } from '../../group/domain/permittable-group-ids';
import { DepositAccountPermittableGroupIds } from '../../depositAccount/domain/permittable-group-ids';
import { TellerPermittableGroupIds } from '../../teller/domain/permittable-group-ids';
import { ReportingPermittableGroupIds } from '../../reporting/domain/permittable-group-ids';
import { ChequePermittableGroupIds } from '../../cheque/domain/permittable-group-ids';
import { PayrollPermittableGroupIds } from '../../payroll/domain/permittable-group-ids';

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
    this._permittableGroupMap[OfficePermittableGroupIds.EMPLOYEE_MANAGEMENT] = { id: 'office_employees', label: 'Employees' };
    this._permittableGroupMap[OfficePermittableGroupIds.OFFICE_MANAGEMENT] = { id: 'office_offices', label: 'Offices' };
    this._permittableGroupMap[OfficePermittableGroupIds.SELF_MANAGEMENT] = {
      id: 'office_self',
      label: 'User created resources(Offices & Employees)',
    };

    this._permittableGroupMap[IdentityPermittableGroupIds.IDENTITY_MANAGEMENT] = { id: 'identity_identities', label: 'Identities' };
    this._permittableGroupMap[IdentityPermittableGroupIds.ROLE_MANAGEMENT] = { id: 'identity_roles', label: 'Roles' };
    this._permittableGroupMap[IdentityPermittableGroupIds.SELF_MANAGEMENT] = {
      id: 'identity_self',
      label: 'User created resources(Identity & Roles)',
    };

    this._permittableGroupMap[GroupPermittableGroupIds.GROUP_MANAGEMENT] = { id: 'group_groups', label: 'Groups' };
    this._permittableGroupMap[GroupPermittableGroupIds.GROUP_DEFINITION] = { id: 'group_definition', label: 'Group definition' };

    this._permittableGroupMap[CustomerPermittableGroupIds.CUSTOMER_MANAGEMENT] = { id: 'customer_customers', label: 'Members' };
    this._permittableGroupMap[CustomerPermittableGroupIds.TASK_MANAGEMENT] = { id: 'customer_tasks', label: 'Tasks' };
    this._permittableGroupMap[CustomerPermittableGroupIds.CATALOG_MANAGEMENT] = { id: 'catalog_catalogs', label: 'Custom fields' };
    this._permittableGroupMap[CustomerPermittableGroupIds.IDENTITY_CARD_MANAGEMENT] = {
      id: 'customer_identifications',
      label: 'Member identification cards',
    };
    this._permittableGroupMap[CustomerPermittableGroupIds.PORTRAIT_MANAGEMENT] = { id: 'customer_portrait', label: 'Member portrait' };
    this._permittableGroupMap[CustomerPermittableGroupIds.CUSTOMER_DOCUMENT] = { id: 'customer_documents', label: 'Member documents' };

    this._permittableGroupMap[AccountingPermittableGroupIds.ACCOUNT_MANAGEMENT] = { id: 'accounting_accounts', label: 'Accounts' };
    this._permittableGroupMap[AccountingPermittableGroupIds.JOURNAL_MANAGEMENT] = { id: 'accounting_journals', label: 'Journal' };
    this._permittableGroupMap[AccountingPermittableGroupIds.LEDGER_MANAGEMENT] = { id: 'accounting_ledgers', label: 'Ledger' };
    this._permittableGroupMap[AccountingPermittableGroupIds.TRANSACTION_TYPES] = { id: 'accounting_tx_types', label: 'Transaction types' };
    this._permittableGroupMap[AccountingPermittableGroupIds.THOTH_INCOME_STMT] = {
      id: 'accounting_income_statement',
      label: 'Income statement',
    };
    this._permittableGroupMap[AccountingPermittableGroupIds.THOTH_FIN_CONDITION] = {
      id: 'accounting_fin_condition',
      label: 'Financial condition',
    };

    this._permittableGroupMap[PortfolioPermittableGroupIds.PRODUCT_OPERATIONS_MANAGEMENT] = {
      id: 'portfolio_product_operations',
      label: 'Loan product operations',
    };
    this._permittableGroupMap[PortfolioPermittableGroupIds.PRODUCT_LOSS_PROVISIONING_MANAGEMENT] = {
      id: 'portfolio_loss_provision',
      label: 'Loan loss provision',
    };
    this._permittableGroupMap[PortfolioPermittableGroupIds.PRODUCT_MANAGEMENT] = { id: 'portfolio_products', label: 'Loan products' };
    this._permittableGroupMap[PortfolioPermittableGroupIds.CASE_MANAGEMENT] = { id: 'portfolio_cases', label: 'Member loans' };
    this._permittableGroupMap[PortfolioPermittableGroupIds.CASE_DOCUMENT_MANAGEMENT] = {
      id: 'portfolio_documents',
      label: 'Member loan documents',
    };

    this._permittableGroupMap[DepositAccountPermittableGroupIds.DEFINITION_MANAGEMENT] = {
      id: 'deposit_definitions',
      label: 'Deposit account management',
    };
    this._permittableGroupMap[DepositAccountPermittableGroupIds.INSTANCE_MANAGEMENT] = {
      id: 'deposit_instances',
      label: 'Deposit account for members',
    };

    this._permittableGroupMap[TellerPermittableGroupIds.TELLER_MANAGEMENT] = { id: 'teller_management', label: 'Teller management' };
    this._permittableGroupMap[TellerPermittableGroupIds.TELLER_OPERATION] = { id: 'teller_operations', label: 'Teller operations' };

    this._permittableGroupMap[ReportingPermittableGroupIds.REPORT_MANAGEMENT] = { id: 'reporting_management', label: 'Report management' };

    this._permittableGroupMap[ChequePermittableGroupIds.CHEQUE_TRANSACTION] = { id: 'cheque_transaction', label: 'Cheque transaction' };
    this._permittableGroupMap[ChequePermittableGroupIds.CHEQUE_MANAGEMENT] = { id: 'cheque_management', label: 'Cheque management' };

    this._permittableGroupMap[PayrollPermittableGroupIds.CONFIGURATION] = { id: 'payroll_configuration', label: 'Payroll configuration' };
    this._permittableGroupMap[PayrollPermittableGroupIds.DISTRIBUTION] = { id: 'payroll_distribution', label: 'Payroll distribution' };
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
