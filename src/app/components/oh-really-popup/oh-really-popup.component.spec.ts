import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OhReallyPopupComponent } from './oh-really-popup.component';

describe('OhReallyPopupComponent', () => {
  let component: OhReallyPopupComponent;
  let fixture: ComponentFixture<OhReallyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OhReallyPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OhReallyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
