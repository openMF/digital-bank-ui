import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { OfficeService } from '../../services/office/office.service';
import { DepositAccountService } from '../../services/depositAccount/deposit-account.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  data: string;
}

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  offices: any[] = [];
  customers: any[] = [];
  depositAccounts: any[] = [];
  filteredCustomers: any[] = [];
  selectedOffice: string = '';
  showAccountingData: boolean = false;
  selectedCustomer: any = '';
  selectedDeposit: any = '';
  selectedCredit: any = '';
  customerPortrait: any = '';
  safeUrl: any;
  private defaultUrl = '../../../../assets/images/ic_account_circle_black_48dp_2x.png';

  solarValue: number;

  withdraw: CardSettings = {
    title: 'Total Withdraw Amount',
    iconClass: 'nb-arrow-down',
    type: 'warning',
    data: '$ 12312',
  };

  deposit: CardSettings = {
    title: 'Total Deposit Amount',
    iconClass: 'nb-arrow-up',
    type: 'success',
    data: '$ 35829',
  };

  posted_interest: CardSettings = {
    title: 'Total Posted Interest',
    iconClass: 'nb-bar-chart',
    type: 'info',
    data: '$ 563',
  };

  accured_interest: CardSettings = {
    title: 'Total Interest Accured',
    iconClass: 'nb-bar-chart',
    type: 'info',
    data: '$ 156',
  };

  outstanding: CardSettings = {
    title: 'Total Outstanding',
    iconClass: 'nb-alert',
    type: 'warning',
    data: '$ 563',
  };

  disbursed: CardSettings = {
    title: 'Total Disbursed',
    iconClass: 'nb-list',
    type: 'success',
    data: '$ 1000',
  };

  statusCards: CardSettings[] = [
    this.withdraw,
    this.deposit,
    this.posted_interest,
    this.accured_interest,
    this.outstanding,
    this.disbursed,
  ];

  constructor(
    private customerService: CustomerService,
    private officeService: OfficeService,
    private domSanitizer: DomSanitizer,
    private depositAccountService: DepositAccountService,
  ) {}

  ngOnInit() {
    this.customerService.fetchAllCustomers().subscribe(customerData => (this.customers = customerData.customers));
    this.officeService.listAllOffices().subscribe(officesData => {
      this.offices = officesData.offices;
      this.selectedOffice = officesData.offices[0].name;
    });
  }

  get displayHomePage(): boolean {
    return !this.selectedCustomer;
  }

  get displayCustomerDetailsPage(): boolean {
    return !!this.selectedCustomer;
  }

  get displayCustomerAccountingPage(): boolean {
    return this.showAccountingData && !!this.selectedCustomer;
  }

  get displayAccountDetailsPage(): boolean {
    return this.selectedDeposit || this.selectedCredit;
  }

  selectAccounting(event: any) {
    this.showAccountingData = event;
  }

  onCustomerChange(event: any) {
    const customer = event;
    if (customer) {
      this.customerService.getCustomer(customer).subscribe(data => (this.selectedCustomer = data));
      this.customerService.getPortrait(customer).subscribe(portrait => this.setBlob(portrait));
      this.depositAccountService.fetchProductInstances(customer).subscribe(data => (this.depositAccounts = data));
      this.selectedCredit = '';
      this.selectedDeposit = '';
    } else {
      this.selectedCustomer = null;
    }
  }

  onOfficeChange(event: any) {
    const office = event;
    this.filteredCustomers = this.getFilteredCustomers(office);
  }

  onDepositChange(event: any) {
    const deposit = event;
    this.selectedDeposit = this.depositAccounts.find(depositAcc => depositAcc.accountIdentifier === deposit);
  }

  onCreditChange(event: any) {
    const deposit = event;
    this.selectedCredit = this.depositAccounts.find(depositAcc => depositAcc.accountIdentifier === deposit);
  }

  setBlob(blob: Blob) {
    this.customerPortrait = blob;
    if (blob && blob.size) {
      this.safeUrl = this.getSafeUrl(URL.createObjectURL(blob));
    } else {
      this.safeUrl = this.getSafeUrl(this.defaultUrl);
    }
  }

  getSafeUrl(url: string): SafeUrl {
    this.customerPortrait = url;
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  getFilteredCustomers(office: any) {
    return this.customers.filter(customer => customer.assignedOffice === office);
  }
}
