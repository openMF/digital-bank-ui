export interface ProductInstance {
  customerIdentifier: string;
  productIdentifier: string;
  accountIdentifier?: string;
  alternativeAccountNumber?: string;
  beneficiaries?: string[];
  state?: string;
  balance?: number;
  openedOn?: string;
  lastTransactionDate?: string;
}
