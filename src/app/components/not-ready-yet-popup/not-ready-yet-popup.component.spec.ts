import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotReadyYetPopupComponent } from './not-ready-yet-popup.component';

describe('NotReadyYetPopupComponent', () => {
  let component: NotReadyYetPopupComponent;
  let fixture: ComponentFixture<NotReadyYetPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotReadyYetPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotReadyYetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
