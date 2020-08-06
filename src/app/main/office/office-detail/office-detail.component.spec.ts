import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeDetailComponent } from './office-detail.component';

describe('OfficeDetailComponent', () => {
  let component: OfficeDetailComponent;
  let fixture: ComponentFixture<OfficeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OfficeDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
