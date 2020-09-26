import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestRateComponent } from './interest-rate.component';

describe('InterestRateComponent', () => {
  let component: InterestRateComponent;
  let fixture: ComponentFixture<InterestRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InterestRateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
