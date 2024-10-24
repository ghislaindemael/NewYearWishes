import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMobilePageComponent } from './no-mobile-page.component';

describe('NoMobileComponent', () => {
  let component: NoMobilePageComponent;
  let fixture: ComponentFixture<NoMobilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoMobilePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoMobilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
