import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositDetailComponent } from './deposit-detail.component';

describe('DepositDetailComponent', () => {
  let component: DepositDetailComponent;
  let fixture: ComponentFixture<DepositDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepositDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
