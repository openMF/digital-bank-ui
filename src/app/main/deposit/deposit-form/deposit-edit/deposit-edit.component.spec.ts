import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositEditComponent } from './deposit-edit.component';

describe('DepositEditComponent', () => {
  let component: DepositEditComponent;
  let fixture: ComponentFixture<DepositEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepositEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
