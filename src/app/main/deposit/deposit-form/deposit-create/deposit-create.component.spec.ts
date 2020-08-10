import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositCreateComponent } from './deposit-create.component';

describe('DepositCreateComponent', () => {
  let component: DepositCreateComponent;
  let fixture: ComponentFixture<DepositCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepositCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
