import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintOfficeComponent } from './complaint-office.component';

describe('ComplaintOfficeComponent', () => {
  let component: ComplaintOfficeComponent;
  let fixture: ComponentFixture<ComplaintOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintOfficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
