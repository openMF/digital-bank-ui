import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from '../forms/form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Address } from '../../../services/domain/address/address.model';
import { Country } from '../../../services/country/model/country.model';
import { CountryService } from '../../../services/country/country.service';
import { countryExists } from '../validator/country-exists.validator';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-address-form',
  templateUrl: './address.component.html',
})
export class AddressFormComponent extends FormComponent<Address> implements OnInit {
  options: Country[] = [];
  @ViewChild('autoInput') input: any;

  filteredCountries: Observable<Country[]>;

  @Input() set formData(address: Address) {
    let country: Country;

    if (address) {
      country = this.countryService.fetchByCountryCode(address.countryCode);
    }

    this.form = this.formBuilder.group({
      street: [address ? address.street : undefined, [Validators.required, Validators.maxLength(256)]],
      city: [address ? address.city : undefined, [Validators.required, Validators.maxLength(256)]],
      postalCode: [address ? address.postalCode : undefined, Validators.maxLength(32)],
      region: [address ? address.region : undefined, Validators.maxLength(256)],
      country: [country, [Validators.required], countryExists(this.countryService)],
    });
  }

  constructor(private formBuilder: FormBuilder, private countryService: CountryService) {
    super();
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(data => (this.options = data));
    this.filteredCountries = this.countryService.getCountries();
    this.setFilter();
  }

  setFilter() {
    this.filteredCountries = this.country.valueChanges.pipe(
      startWith(null),
      map(country => (!!(country && typeof country === 'object') ? country.name : country)),
      map(searchTerm => this.filter(searchTerm)),
    );
  }

  private filter(value: any): Country[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.options.filter(optionValue => optionValue.name.toLowerCase().includes(filterValue));
    } else {
      return this.options.slice();
    }
  }

  get formData(): Address {
    const country: Country = this.country.value;

    return {
      street: this.form.get('street').value,
      city: this.form.get('city').value,
      postalCode: this.form.get('postalCode').value,
      region: this.form.get('region').value,
      country: country.name,
      countryCode: country.alpha2Code,
    };
  }

  get street() {
    return this.form.get('street');
  }

  get city() {
    return this.form.get('city');
  }

  get postalCode() {
    return this.form.get('postalCode');
  }

  get region() {
    return this.form.get('region');
  }

  get country() {
    return this.form.get('country');
  }

  countryDisplay(country: any): any {
    return !!(country && typeof country === 'object') ? country.name : country;
  }
}
