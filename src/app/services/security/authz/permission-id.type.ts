
/**
 * List of supported permission ids for fims
 */
export type PermissionId = 'identity_self' | 'identity_identities' | 'identity_roles' |
  'office_self' | 'office_offices' | 'office_employees' |
  'customer_customers' | 'customer_tasks' | 'catalog_catalogs' | 'customer_identifications' | 'customer_portrait' | 'customer_documents' |
  'group_groups'| 'group_definition' |
  'accounting_accounts' | 'accounting_ledgers' | 'accounting_journals' | 'accounting_tx_types' | 'accounting_income_statement' |
  'accounting_fin_condition' |
  'portfolio_product_operations' | 'portfolio_loss_provision' | 'portfolio_products' | 'portfolio_cases' | 'portfolio_documents' |
  'deposit_definitions' | 'deposit_instances' |
  'teller_management' | 'teller_operations' |
  'reporting_management' |
  'cheque_management' | 'cheque_transaction' |
  'payroll_configuration' | 'payroll_distribution';
